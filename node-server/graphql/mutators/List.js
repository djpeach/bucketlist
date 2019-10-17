const {GraphQLNonNull, GraphQLID, GraphQLString} = require('graphql')
const { ListType } = require('../types')
const { ListModel, ItemModel } = require('../../mongodb')
const gqlLogger = require('easy-log')('app:gql')

module.exports.createList = {
  type: ListType,
  args: {
    title: { type: GraphQLNonNull(GraphQLString) },
    userId: { type: GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, { title, userId }) {
    gqlLogger(`creating new list with title: ${title}`)
    return new ListModel({ title, userId }).save()
  }
}

module.exports.deleteList = {
  type: ListType,
  args: {
    id: { type: GraphQLID }
  },
  resolve(parent, { id }) {
    gqlLogger(`deleting list with id: ${id}`)
    ItemModel.deleteMany({ listId: id })
    return ListModel.findByIdAndDelete(id)
  }
}
