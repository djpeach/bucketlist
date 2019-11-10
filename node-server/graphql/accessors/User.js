const {GraphQLNonNull, GraphQLList, GraphQLID, GraphQLString, GraphQLInt} = require('graphql')

const { UserType } = require('../types')
const { UserModel } = require('../../models')
const {gqlLog} = require('../../conf/loggers')

module.exports.getUserById = {
  type: UserType,
  args: {
    id: { type: GraphQLNonNull(GraphQLID)}
  },
  resolve(parent, { id }) {
    gqlLog(`getting user with id: ${id}`)
    return UserModel.findById(id)
  }
}

module.exports.getAllUsers = {
  type: new GraphQLList(UserType),
  resolve(parent, args) {
    gqlLog(`getting all users`)
    return UserModel.find()
  }
}

module.exports.getUsersByQuery = {
  type: new GraphQLList(UserType),
  args: {
    query: { type: GraphQLNonNull(GraphQLString) },
    limit: { type: GraphQLInt, defaultValue: 10 }
  },
  resolve(parent, { query, limit }) {
    if (query === "") {
      return []
    }

    gqlLog(`getting ${limit} users that match query: ${query}`)
    return UserModel.find({ $or: [
      { firstName: { $regex: query, $options: 'i' }},
      { lastName: { $regex: query, $options: 'i' }},
    ]}).limit(limit)
  }
}


module.exports.getFriendsByQuery = {
  type: new GraphQLList(UserType),
  args: {
    userId: { type: GraphQLNonNull(GraphQLID)},
    query: { type: GraphQLNonNull(GraphQLString) },
    limit: { type: GraphQLInt, defaultValue: 10 }
  },
  resolve(parent, { userId, query, limit }) {
    if (query === "") {
      return []
    }

    gqlLog(`getting ${limit} friends that match query: ${query}`)
    return UserModel.find({ $and: [
      {$or: [
        { firstName: { $regex: query, $options: 'i' }},
        { lastName: { $regex: query, $options: 'i' }},
      ]},
      { friends: userId }
    ]}).limit(limit)
  }
}
