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
