const express = require('express');
const { main, allJokes, randomJoke, personalJoke } = require('../controllers/controllers');

const app = express();

app.get('/', main);

app.get('/jokes', allJokes);

app.get('/jokes/random', randomJoke);

app.get('/joke/personal/:first/:last', personalJoke);

module.exports = app;
