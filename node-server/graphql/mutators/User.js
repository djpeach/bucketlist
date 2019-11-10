const {GraphQLNonNull, GraphQLID, GraphQLString} = require('graphql')

const { UserType } = require('../types')
const { UserModel } = require('../../models')
const {gqlLog} = require('../../conf/loggers')

module.exports.createUser = {
  type: UserType,
  args: {
    firstName: { type: GraphQLNonNull(GraphQLString) },
    lastName: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve(parent, { firstName, lastName, email }) {
    gqlLog(`creating new user with email: ${email}`)
    return new UserModel({ firstName, lastName, email }).save()
  }
}

module.exports.deleteUser = {
  type: UserType,
  args: {
    id: { type: GraphQLID }
  },
  resolve(parent, { id }) {
    gqlLog(`deleting user with id: ${id}`)
    return UserModel.findByIdAndDelete(id)
  }
}

// ToDo: only add if not already in array: https://stackoverflow.com/questions/26328891/push-value-to-array-if-key-does-not-exist-mongoose/26330406

module.exports.addFriend = {
  type: UserType,
  args: {
    userId: { type: GraphQLID },
    friendId: { type: GraphQLID }
  },
  async resolve(parent, { friendId, userId }) {
    gqlLog(`adding friend with id ${friendId} to user with id: ${userId}`)
    await UserModel.findByIdAndUpdate(friendId, { $push: {
      friends: userId
    }})
    await UserModel.findByIdAndUpdate(userId, { $push: {
      friends: friendId
    }})
    return UserModel.findById(userId)
  }
}

module.exports.removeFriend = {
  type: UserType,
  args: {
    userId: { type: GraphQLID },
    friendId: { type: GraphQLID }
  },
  async resolve(parent, { friendId, userId }) {
    gqlLog(`removing friend with id ${friendId} to user with id: ${userId}`)
    await UserModel.findByIdAndUpdate(friendId, { $pull: {
      friends: userId
    }})
    let user = await UserModel.findByIdAndUpdate(userId, { $pull: {
      friends: friendId
    }})
    return UserModel.findById(userId)
  }
}
