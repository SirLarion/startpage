const cors = require('cors');
const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
});
