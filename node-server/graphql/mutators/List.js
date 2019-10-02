const gql = require('graphql')
const { ListType } = require('../types')
const { ListModel } = require('../../mongodb')
const gqlLogger = require('easy-log')('app:gql')

module.exports.createList = {
  type: ListType,
  args: {
    title: { type: gql.GraphQLNonNull(gql.GraphQLString) },
    userId: { type: gql.GraphQLNonNull(gql.GraphQLID) },
  },
  resolve(parent, { title, userId }) {
    gqlLogger(`creating new list with title: ${title}`)
    return new ListModel({ title, userId }).save()
  }
}
