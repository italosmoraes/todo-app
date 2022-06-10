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
  it.todo('updates a todo')
  it.todo('soft deletes a todo')
})
