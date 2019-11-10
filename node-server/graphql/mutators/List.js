const {GraphQLNonNull, GraphQLID, GraphQLString} = require('graphql')

const { ListType } = require('../types')
const { ListModel, ItemModel } = require('../../models')
const {gqlLog} = require('../../conf/loggers')

module.exports.createList = {
  type: ListType,
  args: {
    title: { type: GraphQLNonNull(GraphQLString) },
    userId: { type: GraphQLNonNull(GraphQLID) },
  },
  resolve(parent, { title, userId }) {
    gqlLog(`creating new list with title: ${title}`)
    return new ListModel({ title, userId }).save()
  }
}

module.exports.deleteList = {
  type: ListType,
  args: {
    id: { type: GraphQLID }
  },
  async resolve(parent, { id }) {
    gqlLog(`deleting list with id: ${id}`)
    await ItemModel.deleteMany({ listId: id })
    return ListModel.findByIdAndDelete(id)
  }
}
