const gql = require('graphql')
const userMutations = require('./User')
const listMutations = require('./List')
const itemMutations = require('./Item')

module.exports = new gql.GraphQLObjectType({
  name: 'Mutators',
  fields: {
    ...userMutations,
    ...listMutations,
    ...itemMutations,
  }
})
