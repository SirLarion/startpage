const cors = require("cors");
const express = require("express");
const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");
require("dotenv").config();

const VALID_CONTENT_TYPES = ["movies", "series"];
const THUMBNAIL_FILE_NAME = "thumbnail.jpg";

const entertainmentPath = path.join(process.cwd(), "entertainment.json");
const productionPath = path.join(process.cwd(), "production.json");

const { MODE, PORT, THEATER_PATH } = process.env;

const filePath = MODE === "entertainment" ? entertainmentPath : productionPath;

const app = express();

const getVideoFileOpener = videoDir => (err, files) => {
  if (!err) {
    const fileName = files.find(
      file => file.endsWith(".mkv") || file.endsWith(".mp4")
    );
    if (fileName !== undefined) {
      exec(`vlc '${videoDir}/${fileName}'`);
    }
  }
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

app.get("/run/:cmd", (req, res) => {
  const cmd = req.params.cmd;
  console.log(`Running command: '${cmd}'`);
  exec(cmd);
});

app.get("/content/:contentType/:name", (req, res) => {
  const content = req.params.contentType;
  const contentPath = `${THEATER_PATH}/${content}/${req.params.name}`;
  if (VALID_CONTENT_TYPES.includes(content)) {
    fs.readdir(contentPath, (err, files) => {
      if (!err) {
        const image = files.find(f => f === THUMBNAIL_FILE_NAME);
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

app.get(["/", "/*"], (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
