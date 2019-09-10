const gql = require('graphql')
const {createSuggestion} = require('./SuggestionMutator')

module.exports = new gql.GraphQLObjectType({
  name: 'Mutators',
  fields: {
    createSuggestion,
  }
})
