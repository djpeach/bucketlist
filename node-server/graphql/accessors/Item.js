const {GraphQLNonNull, GraphQLList, GraphQLID, GraphQLString, GraphQLInt} = require('graphql')

const { ItemType } = require('../types')
const { ItemModel } = require('../../models')
const {gqlLog} = require('../../conf/loggers')

module.exports.getItemsByList = {
  type: new GraphQLList(ItemType),
  args: {
    listId: { type: GraphQLNonNull(GraphQLID) }
  },
  resolve(parent, { listId }) {
    gqlLog(`getting all items that belong to list ${listId}`)
    return ItemModel.find({ listId: listId })
  }
}

module.exports.getNewItemsByUser = {
  type: new GraphQLList(ItemType),
  args: {
    userId: { type: GraphQLNonNull(GraphQLID) }
  },
  resolve(parent, { userId }) {
    gqlLog(`getting all items that belong to user ${userId}, and have no listId`)
    return ItemModel.find({ recipientId: userId, listId: null })
  }
}
