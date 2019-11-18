const {UserModel, ListModel, ItemModel} = require('../models')

module.exports.typeDefs = `
  type Item {
    id: ID!
    from: User!
    to: User
    message: String!
    link: String
  }
`

module.exports.resolvers = {
  from: (item) => {
    return UserModel.findById(item.senderId)
  },
  to: (item) => {
    return UserModel.findById(item.recipientId)
  },
}

module.exports.queryDefs = `
  extend type Query {
    getItemsByList(listId: ID!): [Item]
    getNewItemsByUser(userId: ID!): [Item]
  }
`

module.exports.queries = {
  getItemsByList: (_, {listId}) => {
    return ItemModel.find({listId: listId})
  },
  getNewItemsByUser: (_, {userId}) => {
    return ItemModel.find({recipientId: userId, listId: null})
  },
}

module.exports.mutationDefs = `
  extend type Mutation {
    createItem(
      senderId: ID!
      recipientId: ID!
      message: String!
      link: String
      listId: ID
    ): Item
    assignItemToList(
      id: ID!
      listId: ID!
    ): Item
    deleteItem(id: ID): Item
  }
`

module.exports.mutations = {
  createItem: (_, {...args}) => {
    return new ItemModel({...args}).save()
  },
  assignItemToList: (_, {id, listId}) => {
    return ItemModel.findByIdAndUpdate(id, {listId: listId})
  },
  deleteItem: (_, {id}) => {
    return ItemModel.findByIdAndDelete(id)
  },
}