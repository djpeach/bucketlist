import {gql} from 'apollo-boost'


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
`
}