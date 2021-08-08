'use strict';

const axios = require('axios');

async function getLocation(req, res) {
  let searchCity = req.query.city;
  console.log('here are the query params', searchCity);
  if (searchCity) {
    try {
      console.log('we are inside the try statement');
      let locationIQResult = await axios.get(
        `https://us1.locationiq.com/v1/search.php?key=${process.env.LOCATIONIQ_KEY}&q=${searchCity}&format=json`
      );
      console.log('here are the location results', locationIQResult);
      if (locationIQResult.data) {
        res.status(200).send(locationIQResult.data);
      } else {
        res
          .status(500)
          .send(
            `There was an error trying to get the location lat/lon for ${searchCity} !!!`
          );
      }
    } catch (error) {
      console.log('heckyheck there was an error =====>>>>>>>', error);
      res
        .status(500)
        .send(
          `There was an error trying to get location info from locationIQ: ${error.message}`
        );
    }
  } else {
    res
      .status(500)
      .send(
        `There was an error trying to get the location lat/lon for ${searchCity} !!!`
      );
  }
}

module.exports = getLocation;
