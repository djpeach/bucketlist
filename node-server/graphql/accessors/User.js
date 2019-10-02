const gql = require('graphql')
const { UserType } = require('../types')
const { UserModel } = require('../../mongodb')
const gqlLogger = require('easy-log')('app:gql')

module.exports.getUserById = {
  type: UserType,
  args: {
    id: { type: gql.GraphQLNonNull(gql.GraphQLID)}
  },
  resolve(parent, { id }) {
    gqlLogger(`getting user with id: ${id}`)
    return UserModel.findById(id)
  }
}
