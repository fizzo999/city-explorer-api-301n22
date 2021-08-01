'use strict';

const express = require('express');

const app = express();

const cors = require('cors');

const weatherData = require('./data/weather.json');

require('dotenv').config();

const PORT = process.env.PORT || 3001;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Proof of Life');
});

app.get('/weather', (req, res) => {
  console.log(req.query);
  let queryLat = req.query.lat;
  let queryLon = req.query.lon;
  let queryCity = req.query.city;
  let theRequestedWeatherData = weatherData.find(
    eachCity => eachCity.city_name === queryCity
  );
  if (theRequestedWeatherData) {
    let requestedCityForecastArray = theRequestedWeatherData.data.map(
      eachDay => new Forecast(eachDay.datetime, eachDay.weather.description)
    );
    res.status(200).json(requestedCityForecastArray);
  } else {
    res.status(404).send('no such city, bro !!!');
  }
});

class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}

app.get('*', (req, res) => {
  res.status(404).send('Sorry that route does NOT exist');
});

// function errorHandler(res, error){
//   if (error) {
//     res.status(400);
//   }
// }

app.listen(PORT, () =>
  console.log(`Up and running on http://localhost:${PORT}`)
);
