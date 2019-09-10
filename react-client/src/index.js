import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

const apolloClient = new ApolloClient({
  uri: 'http://localhost:9000/graphql'
})

ReactDOM.render(<ApolloProvider client={ apolloClient }><App/></ApolloProvider>, document.getElementById('root'))
