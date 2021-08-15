'use strict';

const axios = require('axios');

async function getRestaurants(req, res) {
  // this is a bit more complex since we have to set the authorization in the headers to be able to talk to yelp
  // GET `https://api.yelp.com/v3/businesses/search?term=restaurant&latitude=${'37.786882'}&longitude=${'-122.399972'}`
  // const res = await axios.get('https://httpbin.org/get', {
  //    headers: {
  //      Authorization: Bearer YELP_API_KEY
  //    }
  //  });

  // let searchCity = req.query.city;
  let latitude = req.query.lat;
  let longitude = req.query.lon;
  let restaurantURL = `https://api.yelp.com/v3/businesses/search?term=restaurant&latitude=${latitude}&longitude=${longitude}`;
  let restaurantResultsArray = [];
  if (latitude && longitude) {
    try {
      let restaurantAPIResult = await axios.get(restaurantURL, {
        headers: {
          Authorization: `Bearer ${process.env.YELP_API_KEY}`,
        },
      });
      console.log(
        'here are the restaurant results from YELP:',
        restaurantAPIResult.data
      );
      let restaurantAPIResultsrefined = restaurantAPIResult.data.businesses;
      if (restaurantAPIResultsrefined) {
        restaurantResultsArray = restaurantAPIResultsrefined.map(
          eachRestaurantObj => new Restaurant(eachRestaurantObj)
        );
        res.status(200).send(restaurantResultsArray);
      } else {
        res
          .status(500)
          .send(`There was an error trying to get restaurants with YELP !!!`);
      }
    } catch (error) {
      res
        .status(500)
        .send(
          `There was an error trying to get restaurants with YELP: ${error.message}`
        );
    }
  } else {
    res
      .status(500)
      .send(
        `There was an error with the coordinates you provided trying to search for restaurants with YELP`
      );
  }
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
