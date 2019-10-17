import {gql} from 'apollo-boost'

export const createUser = gql`
  mutation($firstName: String!, $lastName: String!, $email: String!) {
    createUser(firstName: $firstName, lastName: $lastName, email: $email) {
      id
      firstName
      lastName
      email
    }
  }
`

export const createList = gql`
  mutation($title: String!, userId: ID!) {
    createList(title: $title, userId: $userId) {
      id
    }
  }
`

export const createItem = gql`
  mutation($senderId: ID!, $recipientId: ID!, $message: String) {
    createItem(senderId: $senderId, recipientId: $recipientId, message: $message) {
      id
      message
      link
      to {
        id
        firstName
        lastName
        email
      }
      from {
        id
        firstName
        lastName
        email
      }
    }
  }
`

export const createItemWithLink = gql`
  mutation($senderId: ID!, $recipientId: ID!, $message: String!, $link: String) {
    createItem(senderId: $senderId, recipientId: $recipientId, message: $message, link: $link) {
      id
      message
      link
      to {
        id
        firstName
        lastName
        email
      }
      from {
        id
        firstName
        lastName
        email
      }
    }
  }
`

export const getUserById = gql`
  query($id: ID!) {
    id
    firstName
    lastName
    email
    lists {
      id
      title
      items {
        id
        from {
          id
          firstName
          lastName
        }
        message
        link
      }
    }
    newItems {
      id
      from {
        id
        firstName
        lastName
      }
      message
      link
    }
  }
}
`