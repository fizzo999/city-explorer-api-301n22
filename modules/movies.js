'use strict';
const axios = require('axios');
let cache = require('./cache.js');

function getMovies(request, response) {
  const { city } = request.query;
  moviesCache(city)
    .then(summaries => {
      response.status(200).send(summaries);
    })
    .catch(error => {
      console.error(error);
      response
        .status(500)
        .send('Sorry. Something went wrong with getting the weather!');
    });
}

function parseMovies(moviesData) {
  try {
    const moviesSummaries = moviesData.results.map(film => {
      return new Movie(film);
    });
    return Promise.resolve(moviesSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

function moviesCache(city) {
  let key = 'movies-' + city;
  let movieURI = `https://api.themoviedb.org/3/search/movie?query=${city}&api_key=${process.env.MOVIE_DB_API_KEY}&language=en-US&page=1&include_adult=false`;

  if (
    cache[key] &&
    Date.now() - cache[key].timestamp < 1000 * 60 * 60 * 24 * 7
  ) {
    console.log('Cache hit movies');
  } else {
    console.log('Cache miss movies');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = axios.get(movieURI).then(response => {
      return parseMovies(response.data);
    });
  }
  return cache[key].data;
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
