const {GraphQLNonNull, GraphQLID, GraphQLString} = require('graphql')

const { ItemType } = require('../types')
const { ItemModel } = require('../../models')
const {gqlLog} = require('../../conf/loggers')

module.exports.createItem = {
  type: ItemType,
  args: {
    senderId: { type: GraphQLNonNull(GraphQLID) },
    recipientId: { type: GraphQLNonNull(GraphQLID) },
    message: { type: GraphQLNonNull(GraphQLString) },
    link: { type: GraphQLString },
    listId: { type: GraphQLID },
  },
  resolve(parent, { ...args }) {
    gqlLog(`creating new item with message: ${args.message}`)
    return new ItemModel({ ...args }).save()
  }
}

module.exports.assignItemToList = {
  type: ItemType,
  args: {
    id: { type: GraphQLNonNull(GraphQLID) },
    listId: { type: GraphQLNonNull(GraphQLID) }
  },
  resolve(parent, { id, listId }) {
    gqlLog(`Adding item ${id} to list ${listId}`)
    return ItemModel.findByIdAndUpdate(id, { listId: listId })
  }
}

module.exports.deleteItem = {
  type: ItemType,
  args: {
    id: { type: GraphQLID }
  },
  resolve(parent, { id }) {
    gqlLog(`deleting item with id: ${id}`)
    return ItemModel.findByIdAndDelete(id)
  }
}
