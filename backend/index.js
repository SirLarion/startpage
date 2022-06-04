const cors = require('cors');
const express = require('express');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const entertainmentPath = path.join(process.cwd(), 'entertainment.json');
const productionPath = path.join(process.cwd(), 'production.json');

const MODE = process.env.MODE;
const PORT = process.env.PORT;

const filePath = MODE === 'entertainment' ? entertainmentPath : productionPath;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/applications', function (req, res) {
  res.sendFile(filePath);
});

app.post('/applications', async function (req, res) {
  fs.writeFile(filePath, JSON.stringify(req.body), () => {});
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
