'use strict';
const axios = require('axios');
let cache = require('./cache.js');

function getWeather(request, response) {
  const { lat, lon } = request.query;
  weatherCache(lat, lon)
    .then(summaries => {
      response.send(summaries);
    })
    .catch(error => {
      console.error(error);
      response
        .status(500)
        .send('Sorry. Something went wrong with getting the weather!');
    });
}

function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.data.map(day => {
      return new Forecast(day);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

function weatherCache(lat, lon) {
  let key = 'weather-' + lat + lon;
  let weatherURI = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&units=I`;

  if (cache[key] && Date.now() - cache[key].timestamp < 1000 * 60 * 60 * 24) {
    console.log('Cache hit weather');
  } else {
    console.log('Cache miss weather');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(weatherURI).then(response => {
      return parseWeather(response.data);
    });
  }
  return cache[key].data;
}

class Forecast {
  constructor(weatherObject) {
    this.date = weatherObject.datetime;
    this.description = weatherObject.weather.description;
    this.low = weatherObject.low_temp;
    this.high = weatherObject.high_temp;
    this.icon = weatherObject.weather.icon;
    this.moonphase = weatherObject.moon_phase;
    this.sunrise = weatherObject.sunrise_ts;
    this.sunset = weatherObject.sunset_ts;
  }
}

module.exports = getWeather;
