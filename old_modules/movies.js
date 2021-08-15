'use strict';

const axios = require('axios');

async function getMovies(req, res) {
  let searchCity = req.query.city;
  let moviesResultsArray = [];
  if (searchCity) {
    try {
      let moviesAPIResult = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${searchCity}&api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&page=1&include_adult=false`
      );
      let moviesAPIResultsrefined = moviesAPIResult.data.results;
      if (moviesAPIResultsrefined) {
        moviesResultsArray = moviesAPIResultsrefined.map(
          eachMovieObj => new Movie(eachMovieObj)
        );
        res.status(200).send(moviesResultsArray);
      } else {
        res.status(500).send(`There was an error trying to get movies !!!`);
      }
    } catch (error) {
      res
        .status(500)
        .send(`There was an error trying to get movies: ${error.message}`);
    }
  } else {
    res
      .status(500)
      .send(`There was an error with the city you searched for movies`);
  }
}

class Movie {
  constructor(movie) {
    this.title = movie.original_title;
    this.overview = movie.overview;
    this.average_votes = movie.vote_average;
    this.total_votes = movie.vote_count;
    this.image_url = movie.poster_path
      ? `https://www.themoviedb.org/t/p/w500/${movie.poster_path}`
      : '';
    this.popularity = movie.popularity;
    this.released_on = movie.release_date;
  }
}
module.exports = getMovies;
