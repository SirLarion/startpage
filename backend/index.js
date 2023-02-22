const cors = require("cors");
const express = require("express");
const path = require("path");
const fs = require("fs");
const { exec, execFile } = require("child_process");
require("dotenv").config();

const VALID_CONTENT_TYPES = ["movies", "series"];
const THUMBNAIL_FILE_NAME = "thumbnail.jpg";

const entertainmentPath = path.join(process.cwd(), "entertainment.json");
const productionPath = path.join(process.cwd(), "production.json");

const { TYPE, PORT, THEATER_PATH, DISK_UUID } = process.env;

const filePath = TYPE === "entertainment" ? entertainmentPath : productionPath;

const app = express();

const getVideoFileOpener = (videoDir) => (err, files) => {
  if (!err) {
    const fileName = files.find(
      (file) => file.endsWith(".mkv") || file.endsWith(".mp4")
    );
    if (fileName !== undefined) {
      console.log(`Attempting to play file: ${videoDir}/${fileName}`);
      execFile("vlc", [`${videoDir}/${fileName}`]);
    }
  }
  console.error(err);
  return undefined;
};

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));

app.get("/applications", (req, res) => {
  res.sendFile(filePath);
});

app.post("/applications", (req, res) => {
  fs.writeFile(filePath, JSON.stringify(req.body), () => {});
});

app.get("/run/pirate-init", (req, res) => {
  fs.readdir(THEATER_PATH, async (err) => {
    if (err) {
      if (DISK_UUID !== undefined) {
        let cmdDone = false;
        exec(
          `cat ${process.cwd()}/.env.pwd | sudo -S mount -t ntfs UUID=${DISK_UUID} /mnt/hdd > /dev/null 2>&1`,
          () => {
            fs.readdir(THEATER_PATH, (err) => {
              if (!err) {
                res.status(200);
              } else {
                res.write("Accessing content storage failed.");
                res.status(500);
              }
            });
            cmdDone = true;
          }
        );
        while (!cmdDone) {
          await new Promise((r) => setTimeout(r, 1));
        }
      } else {
        res.write("Accessing content storage failed.");
        res.status(500);
      }
    } else {
      res.status(200);
    }
    res.end();
  });
});

app.get("/run/:cmd", (req, res) => {
  const cmd = req.params.cmd;
  console.log(`Running command: '${cmd}'`);
  exec(cmd);
});

app.get("/content/:contentType/:name/info", async (req, res) => {
  const content = req.params.contentType;
  const contentPath = `${THEATER_PATH}/${content}/${req.params.name}`;
  const jsonObj = {};
  if (content === "series") {
    const files = fs.readdirSync(contentPath);
    const seasons = {};
    files.forEach((f) => {
      if (fs.lstatSync(`${contentPath}/${f}`).isDirectory()) {
        const seasonFiles = fs.readdirSync(`${contentPath}/${f}`);
        seasons[f] = seasonFiles.filter((f) => f !== "subtitles");
      }
    });
    jsonObj["seasons"] = seasons;
  }
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(jsonObj));
});

app.get("/content/:contentType/:name", (req, res) => {
  const content = req.params.contentType;
  const contentPath = `${THEATER_PATH}/${content}/${req.params.name}`;
  if (VALID_CONTENT_TYPES.includes(content)) {
    fs.readdir(contentPath, (err, files) => {
      if (!err) {
        const image = files.find((f) => f === THUMBNAIL_FILE_NAME);
        if (image !== undefined) {
          res.sendFile(`${contentPath}/${THUMBNAIL_FILE_NAME}`);
        }
      }
    });
  }
});

app.get("/content/:contentType", (req, res) => {
  const content = req.params.contentType;
  if (VALID_CONTENT_TYPES.includes(content)) {
    fs.readdir(`${THEATER_PATH}/${content}`, (err, files) => {
      if (!err) {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(files));
      }
    });
  }
});

app.get("/play/movies/:name", (req, res) => {
  const moviePath = `${THEATER_PATH}/movies/${req.params.name}`;
  fs.readdir(moviePath, getVideoFileOpener(moviePath));
});

app.get("/play/series/:season/:episode", (req, res) => {
  const episodePath = `${THEATER_PATH}/series/${req.params.season}/${req.params.episode}`;
  fs.readdir(episodePath, getVideoFileOpener(episodePath));
});

app.get(["/", "/*"], (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Server listening on PORT ${PORT}`);
});
