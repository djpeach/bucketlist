import {gql} from 'apollo-boost'

export const getAllUsers = gql`
  {
    getAllUsers {
      id
      firstName
      lastName
      email
    }
  }
`

export default {
  getAllUsers
}