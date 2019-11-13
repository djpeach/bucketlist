import { gql } from 'apollo-boost'

export default {
  createUser: gql`
    createUser(firstName: String!, lastName: String!, email: String!) {
      id
      firstName
      lastName
      email
    }
  `,
  deleteUser: gql`
      deleteUser(id:ID!) {
        id
        firstName
        lastName
        email
      }
  `,
  addFriend: gql`
      addFriend(userId: ID!, friendId: ID!) {
        id
        firstName
        lastName
        email
      }
  `,
  removeFriend: gql`
      removeFriend(userId: ID!, friendId: ID!) {
        id
        firstName
        lastName
        email
      }
  `,
}