const {GraphQLNonNull, GraphQLList, GraphQLID, GraphQLString, GraphQLInt} = require('graphql')
const { ItemType } = require('../types')
const { ItemModel } = require('../../mongodb')
const gqlLogger = require('easy-log')('app:gql')

module.exports.getItemsByList = {
  type: new GraphQLList(ItemType),
  args: {
    listId: { type: GraphQLNonNull(GraphQLID) }
  },
  resolve(parent, { listId }) {
    gqlLogger(`getting all items that belong to list ${listId}`)
    return ItemModel.find({ listId: listId })
  }
}
