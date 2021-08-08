'use strict';

const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();

const getLocation = require('./modules/location.js');
const getMovies = require('./modules/movies.js');
const getWeather = require('./modules/weather.js');

const PORT = process.env.PORT || 3001;
app.use(cors());

app.get('/', (req, res) => {
  res.send('Proof of Life - hello from the server we are up and running');
});

app.get('/location', getLocation);
app.get('/weather', getWeather);
app.get('/movies', getMovies);

app.get('*', (req, res) => {
  res.status(404).send('Sorry that route does NOT exist');
});

app.listen(PORT, () =>
  console.log(`Up and running on http://localhost:${PORT}`)
);
