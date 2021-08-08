'use strict';
const axios = require('axios');

async function getWeather(req, res) {
  let queryLat = req.query.lat;
  let queryLon = req.query.lon;
  let weatherURI = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${queryLat}&lon=${queryLon}&key=${process.env.WEATHER_API_KEY}&units=I`;

  try {
    let weatherResult = await axios.get(weatherURI);
    let weatherForecastArray = [];
    console.log(
      'here is the entire weather data======>>>>>>>>>>',
      weatherResult.data.data
    );
    weatherForecastArray = await weatherResult.data.data.map(
      eachForecastedDayObj => new Forecast(eachForecastedDayObj)
    );
    res.status(200).send(weatherForecastArray);
  } catch (error) {
    res.status(400).send(`There was an error: ${error}`);
  }
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
