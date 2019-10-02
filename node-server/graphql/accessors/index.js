const gql = require('graphql')
const {getUserById} = require('./User')

module.exports = new gql.GraphQLObjectType({
  name: 'Accessors',
  fields: {
    getUserById,
  }
})
