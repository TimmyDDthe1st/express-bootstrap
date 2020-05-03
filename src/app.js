const express = require('express');
const {
  mainController,
  allJokes,
  randomJoke,
  personalisedRandomJoke,
} = require('./controllers/mainController');

const app = express();

app.get('/', mainController);

app.get('/jokes', allJokes);

app.get('/joke/random', randomJoke);

app.get('/joke/random/personal/:first/:last', personalisedRandomJoke);

module.exports = app;
