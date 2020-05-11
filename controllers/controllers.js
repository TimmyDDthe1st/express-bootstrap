// eslint-disable-next-line no-unused-vars
const regeneratorRuntime = require('regenerator-runtime');

const axios = require('axios');

exports.allJokes = (req, res) => {
  axios
    .get('https://api.icndb.com/jokes')
    .then(response => {
      res.send({ jokes: response.data });
    })
    .catch(error => {
      res.status(error.statusCode).send({ error: error.message });
    });
};

exports.randomJoke = (req, res) => {
  axios
    .get('https://api.icndb.com/jokes/random?exclude=[explicit]')
    .then(response => {
      res.send({ randomJoke: response.data.value });
    })
    .catch(error => {
      res.status(error.statusCode).send({ error: error.message });
    });
};

exports.personalJoke = async (req, res) => {
  const { first, last } = req.params;

  axios
    .get(
      `https://api.icndb.com/jokes/random?firstName=${first}&lastName=${last}&exclude=[explicit]`,
    )
    .then(response => {
      res.send({ personalJoke: response.data.value });
    })
    .catch(error => {
      res.status(error.statusCode).send({ error: error.message });
    });
};
