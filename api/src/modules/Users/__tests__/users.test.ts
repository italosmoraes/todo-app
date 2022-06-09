import { ApolloServer } from 'apollo-server-express'

describe('users', () => {
  let testServer

  beforeAll(async () => {
    testServer = new ApolloServer({
      typeDefs: schema,
      resolvers: testResolvers
    })
  })

  it.todo('creates a user', () => {})
})
