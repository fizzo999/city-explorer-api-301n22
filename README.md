# Project Name - city-explorer-api LAB 07

I am b uilding the backend to the city explorer react front end app. It allows a frontend to send a http request to a specified route. And as a response send back the data requested.
Specifically I am going to build the locationIQ route, the weather data route, the national parks route and the yelp restaurants route.

### Author: Fizzo Pannosch - currently working as a grading TA for Code Fellows Seattle 301n22 cohort (July31st 2021)

**Version**: 1.0.0 (increment the patch/fix version number if you make more commits past your first submission)

### Links and Resources

- [submission deployed site on heroku](http://xyz.com)
- [submission PR](http://xyz.com)
- Any Links you used as reference

### Reflections and Comments

- Consider including the answers to your daily journal and submission questions here
- This is also a good place to reflect on the tools and resources used and learned

## Overview

This is a Code Fellows 301 project to train students to make a server app. This App connects to the locationIQ API to convert a US city name into long and lat data that then is used for a secondary request. This second request is designed to hit the movie API, weather API and yelp API to get movie, weather and restaurant data for the city entered.

<!-- Provide a high level overview of what this application is and why you are building it, beyond the fact that it's an assignment for this class. (i.e. What's your problem domain?) -->

## Getting Started

git clone this repo to your local machine.
Create a .env file with the following tokens you will have to get from:

locationIQ
movie API
weather API
yelp API
and store them in your .env file. Be careful with the naming convention. This is after all a react app...

<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->

## Architecture

using create-react app
axios for API calls
and bootstrap/react-bootstrap for quick and easy styling

<!-- Provide a detailed description of the application design. What technologies (languages, libraries, etc) you're using, and any other relevant design information. -->

## Change Log

<!-- Use this area to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an example:

01-01-2001 4:59pm - Application now has a fully-functional express server, with a GET route for the location resource. -->

## Credit and Collaborations

<!-- Give credit (and a link) to other people or resources that helped you build this application. -->
