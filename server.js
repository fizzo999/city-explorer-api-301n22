'use strict';

const express = require('express');

const app = express();

const cors = require('cors');

const weatherData = require('./data/weather.json');
const axios = require('axios');

require('dotenv').config();

const PORT = process.env.PORT || 3001;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Proof of Life');
});

app.get('/weather', getWeather);

async function getWeather(req, res) {
  console.log(req.query);
  let queryLat = req.query.lat || 47.6038321;
  let queryLon = req.query.lon || -122.3300624;
  // let queryCity = req.query.city;
  // let theRequestedWeatherData = weatherData.find(
  //   eachCity => eachCity.city_name === queryCity
  // );
  // if (theRequestedWeatherData) {
  //   let requestedCityForecastArray = theRequestedWeatherData.data.map(
  //     eachDay => new Forecast(eachDay.datetime, eachDay.weather.description)
  //   );
  //   res.status(200).json(requestedCityForecastArray);
  // } else {
  //   res.status(404).send('no such city, bro !!!');
  // }
  let weatherURI = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${queryLat}&lon=${queryLon}&key=${process.env.WEATHER_API_KEY}&units=I`;

  // {
  //   "description": "Low of 17.1, high of 23.6 with broken clouds",
  //   "date": "2021-03-31"
  // },

  try {
    console.log('here is what we are asking ', weatherURI);
    let weatherResult = await axios.get(weatherURI);
    await console.log('here is the weather', weatherResult.data);
    let weatherForecastArray = [];
    weatherForecastArray = await weatherResult.data.data.map(
      eachForecastedDayObj => new Forecast(eachForecastedDayObj)
    );
    console.log('here is your forecast Array', weatherForecastArray);
    res.status(200).send(weatherForecastArray);
  } catch (error) {
    res.status(400).send(`There was an error: ${error}`);
  }
}

class Forecast {
  constructor(weatherObject) {
    this.date = weatherObject.datetime;
    this.description = `Low of ${weatherObject.low_temp}, high of ${weatherObject.high_temp} with ${weatherObject.weather.description}`;
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
