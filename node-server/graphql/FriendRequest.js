const { UserModel, ListModel, ItemModel, FriendRequestModel } = require('../models')

module.exports.typeDefs = `
  type FriendRequest {
    id: ID!
    from: User!
    to: User!
  }
`

module.exports.resolvers = {
  from: (request) => {
    return UserModel.findById(request.senderId)
  },
  to: (request) => {
    return UserModel.findById(request.recipientId)
  },
}

module.exports.queryDefs = `
  extend type Query {
    getFriendRequestsByUser(userId: ID!): [FriendRequest]
  }
`

module.exports.queries = {
  getFriendRequestsByUser: (_, { userId }) => {
    return FriendRequestModel.find({ recipientId: userId })
  },
}

module.exports.mutationDefs = `
  extend type Mutation {
    createFriendRequest(senderId: ID!, recipientId: ID!): FriendRequest
    acceptFriendRequest(id: ID!): FriendRequest
    rejectFriendRequest(id: ID!): FriendRequest
  }
`

module.exports.mutations = {
  createFriendRequest: (_, { ...args }) => {
    return FriendRequestModel({ ...args }).save()
  },
  acceptFriendRequest: async (_, { id }) => {
    const request = await FriendRequestModel.findById(id)
    await UserModel.findByIdAndUpdate(request.senderId, { $push: {
      friends: request.recipientId
    }})
    await UserModel.findByIdAndUpdate(request.recipientId, { $push: {
      friends: request.senderId
    }})
    return FriendRequestModel.findByIdAndDelete(id)
  },
  rejectFriendRequest: async (_, { id }) => {
    return FriendRequestModel.findByIdAndDelete(id)
  },
}
