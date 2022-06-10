import { ApolloError } from 'apollo-server-core'
import { JWT_SECRET } from '../../../config/env'
import { Request } from 'express'
import jwt from 'jsonwebtoken'

// TODO add auth middleware in a way that allows less repetitive way for resolves to use it
export class AuthModule {
  static authenticate = (req: Request) => {
    console.log('>>> going through guard...')

    const authToken = req.headers?.authorization?.split(' ')[1]

    if (!authToken) {
      throw new Error('No auth token provided')
    }

    try {
      const decoded = jwt.verify(authToken, JWT_SECRET)
      return {
        userId: decoded.userId
      }
    } catch (error) {
      throw new ApolloError('Invalid Token')
    }
  }
}
