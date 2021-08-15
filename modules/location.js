'use strict';
const axios = require('axios');
let cache = require('./cache.js');

function getLocation(request, response) {
  const { city } = request.query;
  locationCache(city)
    .then(summaries => {
      response.status(200).send(summaries);
    })
    .catch(error => {
      console.error(error);
      response
        .status(500)
        .send('Sorry. Something went wrong with getting the location!');
    });
}

function parseLocation(locationData) {
  try {
    return Promise.resolve(locationData);
  } catch (e) {
    return Promise.reject(e);
  }
}

function locationCache(city) {
  let key = 'location-' + city;
  let locationURL = `https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATIONIQ_KEY}&q=${city}&format=json`;
  if (
    cache[key] &&
    Date.now() - cache[key].timestamp < 1000 * 60 * 60 * 24 * 7 * 52
  ) {
    console.log('Cache hit Location');
  } else {
    console.log('Cache miss Location');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(locationURL).then(response => {
      return parseLocation(response.data);
    });
  }
  return cache[key].data;
}

module.exports = getLocation;
