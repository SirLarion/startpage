import fs from "node:fs";
import { Database } from 'bun:sqlite';
import { range } from 'ramda';
import { v4 as uuid } from 'uuid';
import { getMetaData, getVideoFile } from "./lib";

const { DB, THEATER_PATH } = process.env;

const db = new Database(DB, { create: true });

const tables = [
  'CREATE TABLE IF NOT EXISTS movies (\
    id TEXT PRIMARY KEY, \
    file TEXT NOT NULL, \
    name TEXT NOT NULL, \
    length TEXT NOT NULL \
  );',
  'CREATE TABLE IF NOT EXISTS series (\
    id TEXT PRIMARY KEY, \
    name TEXT NOT NULL, \
    seasons INTEGER NOT NULL \
  );',
  'CREATE TABLE IF NOT EXISTS episodes (\
    id TEXT PRIMARY KEY, \
    seriesId TEXT NOT NULL, \
    season INTEGER NOT NULL, \
    episodeIndex INTEGER NOT NULL, \
    file TEXT NOT NULL, \
    length TEXT NOT NULL, \
    lastPlayed TEXT \
  );'
];

const init = async () => {
  tables.forEach(initTable => db.query(initTable).run());

  // Insert movies
  await Promise.all(fs.readdirSync(`${THEATER_PATH}/movies`).map(async movie => {
    const id = uuid();
    const dir = `${THEATER_PATH}/movies/${movie}`;
    const files = fs.readdirSync(dir);
    const movieFile = getVideoFile(files);
    const meta = await getMetaData(`${dir}/${movieFile}`);
    db.query(`INSERT INTO movies (id, file, name, length) VALUES ("${id}", "${movieFile}", "${movie}", "${meta.length}");`).run()
  }));

  // Insert series
  const series = await Promise.all(fs.readdirSync(`${THEATER_PATH}/series`).map(async serie => {
    const id = uuid();
    const dir = `${THEATER_PATH}/series/${serie}`;
    const numSeasons = fs.readdirSync(dir).filter(f => fs.lstatSync(`${dir}/${f}`).isDirectory()).length;
    db.query(`INSERT INTO series (id, name, seasons) VALUES ("${id}", "${serie}", ${numSeasons});`).run();
    return { id, serie, path: dir, numSeasons };
  }));

  // Insert episodes
  await Promise.all(series.map(async ({ id: seriesId, path, numSeasons }) => {
    return await Promise.all(range(1, numSeasons +1).map(async s => {
      const dir = `${path}/s${s}`;
      const episodes = fs.readdirSync(dir).filter((f) => f !== "subtitles");
      return await Promise.all(episodes.map(async (e, i) => {
        console.log(e)
        const id = uuid();
        const meta = await getMetaData(`${dir}/${e}`);
        db.query(`\
          INSERT INTO episodes (id, seriesId, season, episodeIndex, file, length) \ 
          VALUES ("${id}", "${seriesId}", "${s}", "${i}", "${e}", "${meta.length}");
        `).run();
      }))
    }));
  }));
};

await init();

