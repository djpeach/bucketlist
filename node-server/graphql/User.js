const { UserModel, ListModel, ItemModel } = require('../models')

module.exports.typeDefs = `
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    lists: [List]
    newItems: [Item]
    friends: [User]
  }
`

module.exports.resolvers = {
  lists: (user) => {
    return ListModel.find({ userId: user.id })
  },
  newItems: (user) => {
    return ItemModel.find({ recipientId: user.id, listId: null })
  },
  friends: (user) => {
    return UserModel.find({ id: { $in: user.friends } })
  },
}

module.exports.queryDefs = `
  extend type Query {
    getUserById(id: ID!): User
    getAllUsers: [User]
    getUsersByQuery(
      query: String!
      limit: Int = 10
    ): [User]
    getFriendsByQuery(
      userId: ID!
      query: String!
      limit: Int = 10
    ): [User]
    getAllFriends(userId: ID!): [User]
  }
`

module.exports.queries = {
  getUserById: (_, { id }) => {
    return UserModel.findById(id)
  },
  getAllUsers: () => {
    return UserModel.find()
  },
  getUsersByQuery: (_, { query, limit }) => {
    return UserModel.find({
      $or: [
        { firstName: { $regex: query, $options: 'i' } },
        { lastName: { $regex: query, $options: 'i' } },
      ],
    }).limit(limit)
  },
  getFriendsByQuery: (_, { userId, query, limit }) => {
    return UserModel.find({
      $and: [
        {
          $or: [
            { firstName: { $regex: query, $options: 'i' } },
            { lastName: { $regex: query, $options: 'i' } },
          ],
        },
        { friends: userId },
      ],
    }).limit(limit)
  },
  getAllFriends: (_, { userId }) => {
    return UserModel.find({ friends: userId })
  },
}

module.exports.mutationDefs = `
  extend type Mutation {
    createUser(
      firstName: String!
      lastName: String!
      email: String!
    ): User
    deleteUser(id: ID): User
    addFriend(
      userId: ID
      friendId: ID
    ): User
    removeFriend(
      userId: ID
      friendId: ID
    ): User
  }
`

module.exports.mutations = {
  createUser: (_, { firstName, lastName, email }) => {
    return new UserModel({ firstName, lastName, email }).save()
  },
  deleteUser: (_, { id }) => {
    return UserModel.findByIdAndDelete(id)
  },
  addFriend: async (_, { userId, friendId }) => {
    await UserModel.findByIdAndUpdate(friendId, {
      $push: {
        friends: userId,
      },
    })
    await UserModel.findByIdAndUpdate(userId, {
      $push: {
        friends: friendId,
      },
    })
    return UserModel.findById(userId)
  },
  removeFriend: async (_, { userId, friendId }) => {
    await UserModel.findByIdAndUpdate(friendId, {
      $pull: {
        friends: userId,
      },
    })
    await UserModel.findByIdAndUpdate(userId, {
      $pull: {
        friends: friendId,
      },
    })
    return UserModel.findById(userId)
  },
}
