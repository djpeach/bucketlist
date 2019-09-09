const gql = require('graphql')
const { SuggestionType } = require('../types')
const { SuggestionModel } = require('../../mongodb')

module.exports.createSuggestion = {
  type: SuggestionType,
  args: {
    message: { type: gql.GraphQLNonNull(gql.GraphQLString) }
  },
  resolve(parent, { message }) {
    return new SuggestionModel({ message }).save()
  }
}