const expect  = require('chai').expect;
const request = require('request');

describe('Auth Tests', function(done) {
  describe('Authorized', function(done) {
    it('should allow authorized users, with 400', function(done) {
      let req = {
        url: 'http://localhost:9000/graphql',
        headers: {
          'AuthToken': process.env.AUTH_TOKEN
        }
      }

        request(req , function(error, response, body) {
            expect(response.statusCode).to.equal(400);
            done();
        });
    });
  })
  describe('Unauthorized', function(done) {
    it('should block unauthorized users, with 403', function(done) {
      let req = {
        url: 'http://localhost:9000/graphql'
      }

        request(req , function(error, response, body) {
            expect(response.statusCode).to.equal(403);
            done();
        });
    });
  })
})
