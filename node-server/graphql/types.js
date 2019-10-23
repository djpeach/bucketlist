const {GraphQLID, GraphQLString, GraphQLObjectType, GraphQLList} = require('graphql')
const {UserModel, ItemModel, ListModel} = require('../mongodb')
const gqlLogger = require('easy-log')('app:gql')

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => {
    return {
      id: { type: GraphQLID },
      firstName: { type: GraphQLString },
      lastName: { type: GraphQLString },
      email: { type: GraphQLString },
      lists: {
        type: new GraphQLList(ListType),
        resolve(parent, args) {
          gqlLogger(`resolving lists for user: ${parent.id}`)
          return ListModel.find({userId: parent.id})
        }
      },
      newItems: {
        type: new GraphQLList(ItemType),
        resolve(parent, args) {
          gqlLogger(`resolving newItems for user: ${parent.id}`)
          return ItemModel.find({recipientId: parent.id, listId: null})
        }
      },
      friends: {
        type: new GraphQLList(UserType),
        resolve(parent, args) {
          gqlLogger(`resolving the friends for user: ${parent.id}`)
          return UserModel.find({_id: {$in: parent.friends}})
        }
      }
    }
  }
})

const ListType = new GraphQLObjectType({
  name: 'List',
  fields: () => {
    return {
      id: { type: GraphQLID },
      title: { type: GraphQLString },
      items: {
        type: new GraphQLList(ItemType),
        resolve(parent, args) {
          gqlLogger(`resolving items for list: ${parent.id}`)
          return ItemModel.find({listId: parent.id})
        }
      }
    }
  }
})

const ItemType = new GraphQLObjectType({
  name: 'Item',
  fields: () => {
    return {
      id: { type: GraphQLID },
      from: {
        type: UserType,
        resolve(parent, args) {
          gqlLogger(`resolving sender for item: ${parent.id}`)
          return UserModel.findById(parent.senderId)
        }
      },
      to: {
        type: UserType,
        resolve(parent, args) {
          gqlLogger(`resolving reciever for item: ${parent.id}`)
          return UserModel.findById(parent.recipientId)
        }
      },
      message: { type: GraphQLString },
      link: { type: GraphQLString }
    }
  }
})

module.exports = {UserType, ListType, ItemType}
