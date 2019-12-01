const { UserModel, ListModel, ItemModel, FriendRequestModel } = require('../models')

module.exports.typeDefs = `
  type User {
    _id: ID!
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    lists: [List]
    newItems: [Item]
    friends: [User]
    friendRequests: [FriendRequest]
  }
`

module.exports.resolvers = {
  id: (user) => { return user.fbId },
  lists: (user) => {
    return ListModel.find({ userId: user.id })
  },
  newItems: (user) => {
    return ItemModel.find({ recipientId: user.id, listId: null })
  },
  friends: (user) => {
    return UserModel.find({ fbId: { $in: user.friends } })
  },
  friendRequests: (user) => {
    return FriendRequestModel.find({ recipientId: user.id })
  }
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
    return UserModel.findOne({fbId: id})
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
      id: ID!
    ): User
    deleteUser(id: ID): User
    removeFriend(
      userId: ID
      friendId: ID
    ): User
  }
`

module.exports.mutations = {
  createUser: (_, { firstName, lastName, email, id }) => {
    return new UserModel({ firstName, lastName, email, fbId: id }).save()
  },
  deleteUser: (_, { id }) => {
    return UserModel.findOneAndDelete({fbId: id})
  },
  removeFriend: async (_, { userId, friendId }) => {
    await UserModel.findOneAndUpdate({fbId: friendId}, {
      $pull: {
        friends: userId,
      },
    })
    return UserModel.findOneAndUpdate({fbId: userId}, {
      $pull: {
        friends: friendId,
      },
    })
  },
}
