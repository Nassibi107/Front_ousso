import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import {createClient} from 'graphql-ws';

import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  gql,
  split

} from '@apollo/client';

import { ApolloProvider  } from '@apollo/client/react';
import { setContext } from '@apollo/client/link/context';

const BACK_URL = import.meta.env.VITE_API_BACKEND_URL;
const GRQLURL = import.meta.env.VITE_API_URL_GRAPHQL;

const wsLink = new GraphQLWsLink(createClient({
  url: `${GRQLURL.replace('http', 'ws')}`,
  connectionParams: {
    authToken: localStorage.getItem('token'),
  },
}));
// Create a HttpLink explicitly

const link = new HttpLink({
  uri: GRQLURL,
  credentials:'same-origin'
});


const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    }
  }
});

const splitLink = split (
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(link)
)
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});
  

createRoot(document.getElementById('root')).render(
 
 <ApolloProvider client={client}>
      <App />
   </ApolloProvider>
,
)
