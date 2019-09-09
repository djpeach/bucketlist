const gql = require('graphql')
const query = require('./accessors')
const mutation = require('./mutators')

module.exports = new gql.GraphQLSchema({ query, mutation })