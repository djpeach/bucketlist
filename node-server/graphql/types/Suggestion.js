const gql = require('graphql')

module.exports = new gql.GraphQLObjectType({
  name: 'Suggestion',
  fields: () => {
    return {
      id: { type: gql.GraphQLID },
      message: { type: gql.GraphQLString }
    }
  }
})