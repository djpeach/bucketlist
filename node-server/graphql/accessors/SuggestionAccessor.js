const gql = require('graphql')
const { SuggestionType } = require('../types')
const { SuggestionModel } = require('../../mongodb')
const gqlLogger = require('easy-log')('app:gql')

module.exports.getAllSuggestions = {
  type: new gql.GraphQLList(SuggestionType),
  resolve(parent, args) {
    gqlLogger(`resolving accessor getAllSuggestions`)
    return SuggestionModel.find()
  }
}

module.exports.getSuggestionById = {
  type: SuggestionType,
  args: {
    id: {
      type: gql.GraphQLNonNull(gql.GraphQLID)
    }
  },
  resolve(parent, { id }) {
    gqlLogger(`resolving accessor getSuggestionById with Id: ${id}`)
    return SuggestionModel.findById(id)
  }
}