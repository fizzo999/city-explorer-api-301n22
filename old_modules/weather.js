'use strict';
const axios = require('axios');
let cache = require('./cache.js');

function getWeather(request, response) {
  const { lat, lon } = request.query;
  weatherCache(lat, lon)
    .then(summaries => {
      console.log(
        'we are inside of weatherCache and here are the summaries',
        summaries
      );
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
    console.log('we are inside of parse', weatherSummaries);
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

function weatherCache(lat, lon) {
  let key = 'weather-' + lat + lon;
  let weatherURI = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&units=I`;

  if (cache[key] && Date.now() - cache[key].timestamp < 1000 * 10) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(weatherURI).then(response => {
      parseWeather(response.data);
    });
  }

  console.log('here is cache[key].data', cache[key].data);
  return cache[key].data;

  // try {
  //   let weatherResult = await axios.get(weatherURI);
  //   let weatherForecastArray = [];
  //   console.log(
  //     'here is the entire weather data======>>>>>>>>>>',
  //     weatherResult.data.data
  //   );
  //   weatherForecastArray = await weatherResult.data.data.map(
  //     eachForecastedDayObj => new Forecast(eachForecastedDayObj)
  //   );
  //   res.status(200).send(weatherForecastArray);
  // } catch (error) {
  //   res.status(400).send(`There was an error: ${error}`);
  // }
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
