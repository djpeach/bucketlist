const gql = require('graphql')
const { SuggestionType } = require('../types')
const { SuggestionModel } = require('../../mongodb')

module.exports.getAllSuggestions = {
  type: new gql.GraphQLList(SuggestionType),
  resolve(parent, args) {
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
    return SuggestionModel.findById(id)
  }
}