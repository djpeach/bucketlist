const {GraphQLNonNull, GraphQLID, GraphQLString} = require('graphql')
const { ItemType } = require('../types')
const { ItemModel } = require('../../mongodb')
const gqlLogger = require('easy-log')('app:gql')

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
    gqlLogger(`creating new item with message: ${args.message}`)
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
    gqlLogger(`Adding item ${id} to list ${listId}`)
    return ItemModel.findByIdAndUpdate(id, { listId: listId })
  }
}

module.exports.deleteItem = {
  type: ItemType,
  args: {
    id: { type: GraphQLID }
  },
  resolve(parent, { id }) {
    gqlLogger(`deleting item with id: ${id}`)
    return ItemModel.findByIdAndDelete(id)
  }
}
