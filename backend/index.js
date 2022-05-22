const cors = require('cors');
const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

var selected = '-1';

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.post('/selected', function (req, res) {
  selected = req.body.selected;
  res.json(selected);
});

app.get('/selected', function (req, res) {
  console.log(`poll - selected: ${selected}`);
  res.json(selected);
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
