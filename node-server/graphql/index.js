const { makeExecutableSchema } = require('graphql-tools')
const user = require('./User')
const list = require('./List')
const item = require('./Item')

const typeDefs = [
  `type Query type Mutation`,
  user.typeDefs,
  list.typeDefs,
  item.typeDefs,
  user.queryDefs,
  list.queryDefs,
  item.queryDefs,
  user.mutationDefs,
  list.mutationDefs,
  item.mutationDefs,
]

const resolvers = {
  Query: {
    ...user.queries,
    ...list.queries,
    ...item.queries,
  },
  Mutation: {
    ...user.mutations,
    ...list.mutations,
    ...item.mutations,
  },
  User: { ...user.resolvers },
  List: { ...list.resolvers },
  Item: { ...item.resolvers },
}

module.exports = makeExecutableSchema({ typeDefs, resolvers })
