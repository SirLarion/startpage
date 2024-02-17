import { Elysia } from 'elysia';
import { Database } from 'bun:sqlite';
import { staticPlugin } from '@elysiajs/static';
import cors from '@elysiajs/cors';
import path from 'node:path';
import fs from 'node:fs';
import { getIsTheaterInit } from './lib';
import { groupBy } from 'ramda';

type QueryRes = Record<string, unknown> | undefined;

type TEpisode = {
  id: string;
  season: number;
  file: string;
  length: string;
};

type TMovie = {
  id: string;
  name: string;
  file: string;
  length: string;
};

const VALID_CONTENT_TYPES = ['movies', 'series'];
const THUMBNAIL_FILE_NAME = 'thumbnail.jpg';

const entertainmentPath = path.join(process.cwd(), 'entertainment.json');
const productionPath = path.join(process.cwd(), 'production.json');

const {
  TYPE = 'entertainment',
  PORT = 8080,
  THEATER_PATH = '',
  DB,
  DISK_UUID,
} = process.env;

const theaterInitCmd = [
  'sudo',
  '-S',
  'mount',
  '-t',
  'ntfs',
  `UUID=${DISK_UUID}`,
  '/mnt/hdd',
];

const filePath = TYPE === 'entertainment' ? entertainmentPath : productionPath;

const db = new Database(DB);

const handleOpenVideoFile = (filePath: string, episodeId?: string) => {
  console.info(`Attempting to play file: ${filePath} with VLC`);
  const proc = Bun.spawn(['vlc', filePath]);

  // 5 min timeout
  setTimeout(() => {
    if (proc.exitCode !== undefined) {
      db.query(
        `UPDATE episodes SET lastPlayed = datetime('now') WHERE id = "${episodeId}";`
      ).run();
    }
  }, 300000);
};

new Elysia()
  .use(cors())
  .use(staticPlugin({ prefix: '/' }))
  .get('/applications', () => Bun.file(filePath))
  .post('/applications', ({ body }) => {
    Bun.write(filePath, JSON.stringify(body));
  })
  .get('/run/pirate-init', async ({ set }) => {
    let isInit = await getIsTheaterInit();
    if (!isInit) {
      if (DISK_UUID !== undefined) {
        const proc = Bun.spawn(theaterInitCmd, {
          stdin: Bun.file('.env.pwd'),
          stdout: null,
        });
        await proc.exited;

        isInit = await getIsTheaterInit();

        if (isInit) {
          set.status = 200;
        }
      }
    } else {
      set.status = 200;
      return;
    }
  })
  .get('/run/:cmd', ({ params }) => {
    const cmd = params.cmd;
    console.log(`Running command: '${cmd}'`);
    Bun.spawn([cmd]);
  })
  .get('/content/:contentType/:name/info', async ({ params }) => {
    const { contentType, name: rawName } = params;
    const name = decodeURIComponent(rawName);
    const jsonObj = {};
    if (contentType === 'series') {
      const episodes = (db
        .query(
          `SELECT * FROM episodes INNER JOIN series ON episodes.seriesId = series.id WHERE name = "${name}" ORDER BY episodeIndex;`
        )
        .all() || []) as TEpisode[];
      jsonObj['seasons'] = groupBy((e: TEpisode) => 's' + e.season)(episodes);
    } else if (contentType === 'movies') {
      const info = db
        .query(`SELECT length FROM movies WHERE name = "${name}"`)
        .get() as QueryRes;
      jsonObj['length'] = info?.length;
    }

    return jsonObj;
  })
  .get('/content/:contentType/:name', ({ params, set }) => {
    const { contentType, name } = params;
    const contentPath = `${THEATER_PATH}/${contentType}/${decodeURIComponent(
      name
    )}`;
    console.log(contentPath);
    if (VALID_CONTENT_TYPES.includes(contentType)) {
      const files = fs.readdirSync(contentPath);
      const image = files.find(f => f === THUMBNAIL_FILE_NAME);
      if (image !== undefined) {
        return Bun.file(`${contentPath}/${THUMBNAIL_FILE_NAME}`);
      }
    }
    set.status = 404;
    return [];
  })
  .get('/content/:contentType', ({ params, set }) => {
    const content = params.contentType;
    if (VALID_CONTENT_TYPES.includes(content)) {
      return fs.readdirSync(`${THEATER_PATH}/${content}`);
    }
    set.status = 404;
    return [];
  })
  .get('/play/movies/:name', ({ params }) => {
    const movie = db
      .query(
        `SELECT * FROM movies WHERE name = "${decodeURIComponent(
          params.name
        )}";`
      )
      .get() as TMovie;
    const path = `${THEATER_PATH}/movies/${movie?.name}/${movie?.file}`;
    handleOpenVideoFile(path);
  })
  .get('/play/series/:name/:season/:episode', ({ params }) => {
    const ep = db
      .query(
        `SELECT * FROM episodes WHERE file = "${decodeURIComponent(
          params.episode
        )}";`
      )
      .get() as TEpisode;
    const path = `${THEATER_PATH}/series/${decodeURIComponent(
      params.name
    )}/s${ep?.season}/${ep?.file}`;
    handleOpenVideoFile(path, ep?.id);
  })
  .get('/', () => Bun.file('public/index.html'))
  .get('/select', () => Bun.file('public/index.html'))
  .get('/pirate-theater', () => Bun.file('public/index.html'))
  .listen(PORT, () => console.log(`🚀 Listening at localhost:${PORT}`));
