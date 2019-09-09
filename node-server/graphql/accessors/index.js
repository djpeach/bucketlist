const gql = require('graphql')
const suggestionAccessor = require('./SuggestionAccessor')

module.exports = new gql.GraphQLObjectType({
  name: 'Accessors',
  fields: {
    ...suggestionAccessor,
  }
})