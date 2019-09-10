const {expect} = require('chai')
const request = require('request')

describe("Testing Status Codes", function() {
    it("returns status 200", function() {
        request("http://localhost:9000/graphql", function(err, response, body) {
            expect(response.statusCode).to.equal(400)
        })
    })
})
