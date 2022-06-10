import express, { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { graphqlHTTP } from 'express-graphql'
import { makeExecutableSchema } from '@graphql-tools/schema'
import cors from 'cors'
import { todoModule } from './modules/Todo/TodoModule'
import { mongodb } from './dataSources/mongodb'
import { typeDefs } from './graphql/schema'
import { usersModule } from './modules/Users/UsersModule'
import { JWT_SECRET } from '../config/env'
import { ApolloError } from 'apollo-server-core'

const port = process.env.PORT || 3001
const server = express()

server.use(
  cors({
    origin: 'http://localhost:3000' // TODO resolve from env config
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

const graphqlSchema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: [todoModule, usersModule]
})

// server.use(AuthGuard)

server.use(
  '/graphql',
  graphqlHTTP((request, response) => ({
    schema: graphqlSchema,
    graphiql: true,
    // context: async () => {
    //   console.log('>>> going through context func')
    // }
    context: {
      request,
      response
    },
    formatError: (error: Error) => {
      console.log('err >>', error)
      return new ApolloError(error.message, 'err.apollo')
    }
  }))
)

server.listen(port, () => {
  console.log(`API listening on port ${port} `)
})
