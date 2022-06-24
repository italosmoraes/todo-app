import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { API_URI } from '../config/constants'

//TODO resolve from env vars
const uri = createHttpLink({
  uri: API_URI
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

export const apolloClient = new ApolloClient({
  link: authLink.concat(uri),
  cache: new InMemoryCache()
})
