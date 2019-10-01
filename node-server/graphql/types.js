const {GraphQLID, GraphQLString, GraphQLObjectType, GraphQLList} = require('graphql')
const {UserModel, ItemModel, ListModel} = require('../mongodb')

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
          return ListModel.find({userId: parent.id})
        }
      },
      newItems: {
        type: new GraphQLList(ItemType),
        resolve(parent, args) {
          return ItemModel.find({recipientId: parent.id, listId: null})
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
          return UserModel.findById(parent.senderId)
        }
      },
      to: {
        type: UserType,
        resolve(parent, args) {
          return UserModel.findById(parent.recipientId)
        }
      },
      message: { type: GraphQLString },
      link: { type: GraphQLString }
    }
  }
})

module.exports = {UserType, ListType, ItemType}
