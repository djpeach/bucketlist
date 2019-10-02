const chai = require('chai')
const expect = chai.expect
const chaiHTTP = require('chai-http')

chai.use(chaiHTTP)

describe("Testing Authorizatoin", function() {
  chai.request('http://localhost:9000').get('/graphql').end(function(err, res) {
    expect(res.status).to.equal(403)
  })
})
