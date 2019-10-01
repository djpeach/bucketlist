const gql = require('graphql')
const { UserType } = require('../types')
const { UserModel } = require('../../mongodb')
const gqlLogger = require('easy-log')('app:gql')

module.exports.createUser = {
  type: UserType,
  args: {
    firstName: { type: gql.GraphQLNonNull(gql.GraphQLString) },
    lastName: { type: gql.GraphQLNonNull(gql.GraphQLString) },
    email: { type: gql.GraphQLNonNull(gql.GraphQLString) },
  },
  resolve(parent, { firstName, lastName, email }) {
    gqlLogger(`creating new user with email: ${email}`)
    return new UserModel({ firstName, lastName, email }).save()
  }
}
