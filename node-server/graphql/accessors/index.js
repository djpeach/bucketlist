const gql = require('graphql')
const {getAllSuggestions, getSuggestionById} = require('./SuggestionAccessor')

module.exports = new gql.GraphQLObjectType({
  name: 'Accessors',
  fields: {
    getAllSuggestions,
    getSuggestionById,
  }
})
