import { gql } from 'apollo-boost'

export default {
  getListsByUser: gql`
    query ($id: ID!) {
      getListsByUser(id: $id) {
        id
        title
        items
      }
    }
  `,
  getListsByQuery: gql`
    query ($userId: ID!, $query: String!, $limit: Int = 10) {
      getListsByQuery(id:$userId, query: $query, limit: $limit){
        id
        title
        items
      }
    }
  `,
}