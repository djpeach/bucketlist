import { gql } from 'apollo-boost'

export default {
  getAllUsers: gql`
    {
      getAllUsers {
        id
        firstName
        lastName
        email
      }
    }
  `,
  getUserById: gql`
    query ($id: ID!) {
      getUserById(id: $id) {
        id
        firstName
        lastName
        email
      }
    }
  `,
  getUsersByQuery: gql`
    query ($query: String!,$limit: Int = 10) {
      getUsersByQuery(query: $query,limit: $limit) {
        id
        firstName
        lastName
        email
      }
    }
  `,
  getAllFriends: gql`
    query ($userId: ID!) {
      getAllFriends(userId: $userId) {
        id
        firstName
        lastName
        email
      }
    }
  `,
  getFriendsByQuery: gql`
    query ($userId: ID!, $query: String!, $limit: Int = 10) {
      getFriendsByQuery(userId: $userId, query: $query, limit:$limit) {
        id
        firstName
        lastName
        email
      }
    }
  `,
}