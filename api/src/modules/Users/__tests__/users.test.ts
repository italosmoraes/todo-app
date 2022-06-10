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
  it.todo('returns error if user already exists', () => {})
  it.todo('logs user in', () => {})
  it.todo('returns invalid user error', () => {})
  it.todo('returns incorrect password error', () => {})
})
