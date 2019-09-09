const gql = require('graphql')
const suggestionMutator = require('./SuggestionMutator')

module.exports = new gql.GraphQLObjectType({
  name: 'Mutators',
  fields: {
    ...suggestionMutator,
  }
})