import { ApolloServer } from 'apollo-server-express'

describe('todo', () => {
  let testServer

  beforeAll(async () => {
    testServer = new ApolloServer({
      typeDefs: schema,
      resolvers: testResolvers
    })
  })

  it.todo('creates a todo')
})
