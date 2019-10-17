const {GraphQLNonNull, GraphQLList, GraphQLID, GraphQLString, GraphQLInt} = require('graphql')
const { ListType } = require('../types')
const { ListModel } = require('../../mongodb')
const gqlLogger = require('easy-log')('app:gql')

module.exports.getListsByUser = {
  type: new GraphQLList(ListType),
  args: {
    userId: { type: GraphQLNonNull(GraphQLID) }
  },
  resolve(parent, { userId }) {
    gqlLogger(`getting all lists that belong to user ${userId}`)
    return ListModel.find({ userId: userId })
  }
}

module.exports.getListsByQuery = {
  type: new GraphQLList(ListType),
  args: {
    userId: { type: GraphQLNonNull(GraphQLID) },
    query: { type: GraphQLNonNull(GraphQLString) },
    limit: { type: GraphQLInt, defaultValue: 10 }
  },
  resolve(parent, { userId, query, limit }) {
    gqlLogger(`getting ${limit} lists that belong to user ${userId}, and match query ${query}`)
    return ListModel.find({userId: userId, title: { $regex: query, $options: 'i' }}).limit(limit)
  }
}
