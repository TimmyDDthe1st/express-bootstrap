/**
 * @jest-environment node
 */
const request = require('supertest');
const nock = require('nock');
const app = require('../src/app');

describe('Jokes API', () => {
  it('should return html for my webpage', done => {
    request(app)
      .get('/')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain('Express Chuck Norris jokes');
        done();
      });
  });
});

describe('GET /jokes', () => {
  it('should respond with a list of jokes', done => {
    const mockResponse = {
      type: 'success',
      value: [
        {
          id: 1,
          joke: 'i am a joke',
          categories: [],
        },
        {
          id: 2,
          joke: 'i am another joke',
          categories: [],
        },
      ],
    };

    nock('https://api.icndb.com')
      .get('/jokes')
      .reply(200, mockResponse);

    request(app)
      .get('/jokes')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.jokes.value).toEqual([
          {
            categories: [],
            id: 1,
            joke: 'i am a joke',
          },
          {
            categories: [],
            id: 2,
            joke: 'i am another joke',
          },
        ]);
        done();
      });
  });

  it('should respond with an error message if something goes wrong', done => {
    nock('https://api.icndb.com')
      .get('/jokes')
      .replyWithError({ statusCode: 500, message: 'huge error' });

    request(app)
      .get('/jokes')
      .then(res => {
        expect(res.statusCode).toEqual(500);
        expect(res.body.error).toEqual('huge error');
        done();
      });
  });
});

describe('GET /jokes/random', () => {
  it('respond with a random joke', done => {
    const mockResponse = {
      type: 'success',
      value: {
        id: 115,
        joke: 'i am a random joke',
        categories: [],
      },
    };

    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]' })
      .reply(200, mockResponse);

    request(app)
      .get('/jokes/random')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.randomJoke).toEqual({
          categories: [],
          id: 115,
          joke: 'i am a random joke',
        });
        done();
      });
  });

  it('should respond with an error message if something goes wrong', done => {
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]' })
      .replyWithError({ statusCode: 500, message: 'huge error' });

    request(app)
      .get('/jokes/random')
      .then(res => {
        expect(res.statusCode).toEqual(500);
        expect(res.body.error).toEqual('huge error');
        done();
      });
  });
});

describe('GET /jokes/random/personal', () => {
  it('should respond with a personal joke message', async () => {
    const mockResponse = {
      type: 'success',
      value: {
        id: 141,
        joke: 'random joke about manchester codes',
        categories: [],
      },
    };

    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]', firstName: 'manchester', lastName: 'codes' })
      .reply(200, mockResponse);

    request(app)
      .get('/jokes/personal/manchester/codes')
      .then(res => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.personalJoke).toEqual(mockResponse.value);
      });
  });

  it('should respond with an error message if something goes wrong', done => {
    nock('https://api.icndb.com')
      .get('/jokes/random')
      .query({ exclude: '[explicit]', firstName: 'manchester', lastName: 'codes' })
      .replyWithError({ statusCode: 500, message: 'huge error' });

    request(app)
      .get('/jokes/personal/manchester/codes')
      .then(res => {
        expect(res.statusCode).toEqual(500);
        expect(res.body.error).toEqual('huge error');
        done();
      });
  });
});
