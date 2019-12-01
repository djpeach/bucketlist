const { makeExecutableSchema } = require('graphql-tools')
const user = require('./User')
const list = require('./List')
const item = require('./Item')
const friendRequest = require('./FriendRequest')

const typeDefs = [
  `type Query type Mutation`,
  user.typeDefs,
  list.typeDefs,
  item.typeDefs,
  friendRequest.typeDefs,
  user.queryDefs,
  list.queryDefs,
  item.queryDefs,
  friendRequest.queryDefs,
  user.mutationDefs,
  list.mutationDefs,
  item.mutationDefs,
  friendRequest.mutationDefs,
]

const resolvers = {
  Query: {
    ...user.queries,
    ...list.queries,
    ...item.queries,
    ...friendRequest.queries,
  },
  Mutation: {
    ...user.mutations,
    ...list.mutations,
    ...item.mutations,
    ...friendRequest.mutations,
  },
  User: { ...user.resolvers },
  List: { ...list.resolvers },
  Item: { ...item.resolvers },
  FriendRequest: { ...friendRequest.resolvers },
}

module.exports = makeExecutableSchema({ typeDefs, resolvers })
