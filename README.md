# Project Name - city-explorer-api LAB 07

This is the backend express server to the city explorer react front end app. It allows a frontend to send a http request to a specified route (we start with / and /weather). And as a response the app is sending back the data requested.

Specifically I am going to build the locationIQ route, the weather data route, the movie route and the yelp restaurants route.

### Author: Fizzo Pannosch - currently working as a grading TA for Code Fellows Seattle 301n22 cohort (July31st 2021)

**Version**: 3.0.0

### Links and Resources

- [submission deployed site on heroku](http://xyz.com)
- [submission PR](http://xyz.com)
- Any Links you used as reference

### Reflections and Comments

- It is great to see how easy it has become for me to build an express server

## Overview

This is a Code Fellows 301 project to train students to make a server app. This app connects to the locationIQ API to convert a US city name into long and lat data that then is used for a secondary request. This second request is designed to hit the movie API, weather API and yelp API to get movie, weather and restaurant data for the city entered.

<!-- Provide a high level overview of what this application is and why you are building it, beyond the fact that it's an assignment for this class. (i.e. What's your problem domain?) -->

## Getting Started

git clone this repo to your local machine.
npm i - to install the npm packages for express, dotenv, cors.

Create a .env file with the following tokens:

PORT=3001
MOVIE_DB_API_KEY=
WEATHER_API_KEY=

<!-- https://my.locationiq.com/dashboard/login -->

visit these websites to get your authentication token:
https://www.weatherbit.io/
https://www.themoviedb.org/login

<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->

## Architecture

built in JavaScript using nodeJS and express.js to create a backend server.
using dotenv and cors.

current routes are:

- / home rout to test server
- /weather?lat=&lon=
- /movies?city=

future plans for yelp route:

- /yelp?city=

<!-- Provide a detailed description of the application design. What technologies (languages, libraries, etc) you're using, and any other relevant design information. -->

## Change Log

<!-- Use this area to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an example: -->

07-31-2021 8:59pm - Application now has a fully-functional express server, with a GET route for the weather endpoint.

08-07-2021 7:15pm - Application now has movieDatabase results and weatherbit.io results implemented, also passing better structured data to the frontend

## Credit and Collaborations

big shoutout to Ryan Gallaway - Code Fellows teacher for 301n22 class for a great lecture for lab07 to walk students through creating a server.

big shoutout to Willem Jacobs - got the idea of icons for weather from weatherbit.io from him. Also the use of react-bootstrap icons - and the idea of having a button to show or hide results (I had done that in the 201 project of busmall to display the results of the visual product survey and I like it);

<!-- Give credit (and a link) to other people or resources that helped you build this application -->
