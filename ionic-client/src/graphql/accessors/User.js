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
  {
    getUserById(id:ID!) {
      id
      firstName
      lastName
      email
    }
  }
  `,
  getUserByQuery: gql`
  {
    getUserByQuery(query:String!,limit: Int = 10) {
      id
      firstName
      lastName
      email
    }
  }
  `,
  getFriendsByQuery: gql`
  {
    getFriendsByQuery(userId: ID!, query: String!, limit: Int = 10) {
      id
      firstName
      lastName
      email
    }
  }
  `
}