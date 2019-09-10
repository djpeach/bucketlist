const gql = require('graphql')
const { SuggestionType } = require('../types')
const { SuggestionModel } = require('../../mongodb')
const gqlLogger = require('easy-log')('app:gql')

module.exports.createSuggestion = {
  type: SuggestionType,
  args: {
    message: { type: gql.GraphQLNonNull(gql.GraphQLString) }
  },
  resolve(parent, { message }) {
    gqlLogger(`resolving mutator createSuggestion with data: { message: ${message} }`)
    return new SuggestionModel({ message }).save()
  }
}