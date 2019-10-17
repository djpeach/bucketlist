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
