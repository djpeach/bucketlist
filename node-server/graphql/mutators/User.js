const {GraphQLNonNull, GraphQLID, GraphQLString} = require('graphql')
const { UserType } = require('../types')
const { UserModel } = require('../../mongodb')
const gqlLogger = require('easy-log')('app:gql')

module.exports.createUser = {
  type: UserType,
  args: {
    firstName: { type: GraphQLNonNull(GraphQLString) },
    lastName: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
  },
  resolve(parent, { firstName, lastName, email }) {
    gqlLogger(`creating new user with email: ${email}`)
    return new UserModel({ firstName, lastName, email }).save()
  }
}

module.exports.deleteUser = {
  type: UserType,
  args: {
    id: { type: GraphQLID }
  },
  resolve(parent, { id }) {
    gqlLogger(`deleting user with id: ${id}`)
    return UserModel.findByIdAndDelete(id)
  }
}

module.exports.addFriend = {
  type: UserType,
  args: {
    friendId: { type: GraphQLID },
    userId: { type: GraphQLID }
  },
  async resolve(parent, { friendId, userId }) {
    gqlLogger(`adding friend with id ${friendId} to user with id: ${userId}`)
    let user = UserModel.findById(userId)
    await UserModel.findByIdAndUpdate(friendId, { "$push": {
      "friends": userId
    }})
    await UserModel.findByIdAndUpdate(userId, { "$push": {
      "friends": friendId
    }})
    return UserModel.findById(userId)
  }
}
