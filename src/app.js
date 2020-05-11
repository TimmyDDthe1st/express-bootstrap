const express = require('express');
const { allJokes, randomJoke, personalJoke } = require('../controllers/controllers');

const app = express();

app.use(express.static(`${__dirname}/public`));

app.get('/jokes', allJokes);

app.get('/jokes/random', randomJoke);

app.get('/jokes/personal/:first/:last', personalJoke);

module.exports = app;
