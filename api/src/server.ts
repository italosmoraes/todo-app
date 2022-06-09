import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { makeExecutableSchema } from '@graphql-tools/schema'
import cors from 'cors'
import { todoModule } from './modules/Todo/TodoModule'
import { mongodb } from './dataSources/mongodb'
import { typeDefs } from './graphql/schema'

const port = process.env.PORT || 3001
const server = express()

server.use(
  cors({
    origin: 'http://localhost:3000/todo-app' // TODO resolve from env config
  })
)

// to initialize initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
mongodb
  .initialize()
  .then(() => {
    // here you can start to work with your database
    console.log('--- mongodb connected')
  })
  .catch((error) => console.log(error))

const graphqlSchema = makeExecutableSchema({ typeDefs: typeDefs, resolvers: todoModule })

server.use(
  '/graphql',
  graphqlHTTP((request, response) => ({
    schema: graphqlSchema,
    graphiql: true,
    context: {
      request,
      response
    }
  }))
)

server.listen(port, () => {
  console.log(`API listening on port ${port} `)
})
