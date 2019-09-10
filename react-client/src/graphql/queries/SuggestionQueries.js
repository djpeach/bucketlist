import {gql} from 'apollo-boost'

export const getAllSuggestions = gql`
  {
    getAllSuggestions {
      id
      message
    }
  }
`

export const createSuggestion = gql`
  mutation($message: String!) {
    createSuggestion(message: $message) {
      id
      message
    }
  }
`