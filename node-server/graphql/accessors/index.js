const gql = require('graphql')
const {getUserById, getAllUsers} = require('./User')

module.exports = new gql.GraphQLObjectType({
  name: 'Accessors',
  fields: {
    getUserById,
    getAllUsers
  }
})
