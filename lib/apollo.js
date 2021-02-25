import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
  uri: 'http://54.218.121.170/graphql',
  cache: new InMemoryCache(),
})
