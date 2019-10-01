const gql = require('graphql')
const {createUser} = require('./User')
const {createList} = require('./List')
const {createItem} = require('./Item')

module.exports = new gql.GraphQLObjectType({
  name: 'Mutators',
  fields: {
    createUser,
    createList,
    createItem,
  }
})
