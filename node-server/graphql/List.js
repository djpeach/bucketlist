const {UserModel, ListModel, ItemModel} = require('../models')

module.exports.typeDefs = `
  type List {
    id: ID!
    title: String!
    items: [Item]
  }
`

module.exports.resolvers = {
  items: (list) => { return ItemModel.find({listId: list.id}) },
}

module.exports.queryDefs = `
  extend type Query {
    getListsByUser(userId: ID!): [List]
    getListsByQuery(
      userId: ID!
      query: String!
      limit: Int = 10
    ): [List]
  }
`

module.exports.queries = {
  getListsByUser: (_, {userId}) => { return ListModel.find({userId: userId}) },
  getListsByQuery: (_, {userId, query, limit}) => { return ListModel.find({userId: userId, title: { $regex: query, $options: 'i' }}).limit(limit) },
}

module.exports.mutationDefs = `
  extend type Mutation {
    createList(
      title: String!
      userId: ID!
    ): List
    deleteList(id: ID): List
  }
`

module.exports.mutations = {
  createList: (_, {title, userId}) => { return new ListModel({ title, userId }).save() },
  deleteList: (_, {id}) => { return ListModel.findByIdAndDelete(id) },
}