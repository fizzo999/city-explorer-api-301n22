'use strict';
const axios = require('axios');
let cache = require('./cache.js');

function getRestaurants(request, response) {
  const { lat, lon } = request.query;
  restaurantsCache(lat, lon)
    .then(summaries => {
      response.status(200).send(summaries);
    })
    .catch(error => {
      console.error(error);
      response
        .status(500)
        .send('Sorry. Something went wrong with getting the restaurants!');
    });
}

function parseRestaurants(restaurantsData) {
  try {
    const restaurantsSummaries = restaurantsData.businesses.map(
      eachRestaurant => {
        return new Restaurant(eachRestaurant);
      }
    );
    return Promise.resolve(restaurantsSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

function restaurantsCache(lat, lon) {
  let key = 'restaurants-' + lat + lon;
  let restaurantsURL = `https://api.yelp.com/v3/businesses/search?term=restaurant&latitude=${lat}&longitude=${lon}`;

  if (
    cache[key] &&
    Date.now() - cache[key].timestamp < 1000 * 60 * 60 * 24 * 7
  ) {
    console.log('Cache hit Restaurants');
  } else {
    console.log('Cache miss Restaurants');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios
      .get(restaurantsURL, {
        headers: {
          Authorization: `Bearer ${process.env.YELP_API_KEY}`,
        },
      })
      .then(response => {
        return parseRestaurants(response.data);
      });
  }
  return cache[key].data;
}

class Restaurant {
  constructor(restaurantObject) {
    // this.data = restaurantObject;
    this.name = restaurantObject.name;
    this.image_url = restaurantObject.image_url;
    this.url = restaurantObject.url;
    this.reviews = restaurantObject.review_count;
    this.categories = restaurantObject.categories;
    this.rating = restaurantObject.rating;
    this.transactions = restaurantObject.transactions;
    this.location = restaurantObject.location;
    this.phone = restaurantObject.display_phone;
    this.distance = restaurantObject.distance;
  }
}

module.exports = getRestaurants;
