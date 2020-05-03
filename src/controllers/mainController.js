exports.mainController = (req, res) => {
  res.send({
    message: 'Welcome to my jokes API!',
  });
};

exports.allJokes = (req, res) => {
  res.send({
    message: 'This is the all jokes endpoint',
  });
};

exports.randomJoke = (req, res) => {
  res.send({
    message: 'This is the random joke endpoint',
  });
};

exports.personalisedRandomJoke = (req, res) => {
  res.send({
    message: 'This is the random, personalised joke endpoint',
  });
};
