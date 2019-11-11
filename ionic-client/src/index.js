import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase'
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo'

import keys from './conf/secret-keys'
import App from './App';

firebase.initializeApp(keys.firebaseConfig)

const apolloClient = new ApolloClient({
  uri: 'http://localhost:9000/graphql'
});

ReactDOM.render(<ApolloProvider client={ apolloClient }><App /></ApolloProvider>, document.getElementById('root'));
// ReactDOM.render(<App />, document.getElementById('root'));
