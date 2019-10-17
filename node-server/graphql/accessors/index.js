const gql = require('graphql')
const userAccessors = require('./User')
const listAccessors = require('./List')
const itemAccessors = require('./Item')

module.exports = new gql.GraphQLObjectType({
  name: 'Accessors',
  fields: {
    ...userAccessors,
    ...listAccessors,
    ...itemAccessors
  }
})
