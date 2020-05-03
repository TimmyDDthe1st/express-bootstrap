const request = require('supertest');
const app = require('../src/app');

describe('Jokes API', () => {
  it('GET / should respond with Hello world!', done => {
    const WELCOME_MESSAGE = 'Welcome to my jokes API!';
    request(app)
      .get('/')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual(WELCOME_MESSAGE);
        done();
      });
  });

  it('GET /jokes should respond with This is the all jokes endpoint', done => {
    const MESSAGE = 'This is the all jokes endpoint';
    request(app)
      .get('/jokes')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual(MESSAGE);
        done();
      });
  });

  it('GET /joke/random should respond with a random joke', done => {
    const MESSAGE = 'This is the random joke endpoint';
    request(app)
      .get('/joke/random')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual(MESSAGE);
        done();
      });
  });

  it('GET /joke/random/personal/:first/:last should respond with a random joke but personalised', done => {
    const MESSAGE = 'This is the random, personalised joke endpoint';
    request(app)
      .get('/joke/random/personal/:first/:last')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual(MESSAGE);
        done();
      });
  });
});
