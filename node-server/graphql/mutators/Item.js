const gql = require('graphql')
const { ItemType } = require('../types')
const { ItemModel } = require('../../mongodb')
const gqlLogger = require('easy-log')('app:gql')

module.exports.createItem = {
  type: ItemType,
  args: {
    senderId: { type: gql.GraphQLNonNull(gql.GraphQLID) },
    recipientId: { type: gql.GraphQLNonNull(gql.GraphQLID) },
    message: { type: gql.GraphQLNonNull(gql.GraphQLString) },
    link: { type: gql.GraphQLString },
    listId: { type: gql.GraphQLNonNull(gql.GraphQLID) },
  },
  resolve(parent, { ...args }) {
    gqlLogger(`creating new item with message: ${args.message}`)
    return new ItemModel({ ...args }).save()
  }
}
