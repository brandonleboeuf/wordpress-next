import { client } from '../lib/apollo'
import { ApolloProvider } from '@apollo/client'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
