import { SecurityService } from '../../services/SecurityService'
import { mongodb } from '../../dataSources/mongodb'
import { User } from './entities/User'
import {
  CreateUserInput,
  CreateUserResponse,
  LoginInput,
  LoginResponse
} from '@todo-app/shared-types'

export const usersModule = {
  Mutation: {
    createUser: async (_, { input }: { input: CreateUserInput }): Promise<CreateUserResponse> => {
      try {
        // TODO validate username not in use

        const user = new User()
        user.firstName = input.firstName
        user.lastName = input.lastName
        user.username = input.username

        const { salt, hash } = SecurityService.hashPassword(input.password)

        user.password = hash
        user.passwordSalt = salt

        const saved = await mongodb.manager.save(user)

        const token = SecurityService.signToken(user.id)

        return {
          user: saved,
          token
        }
      } catch (error) {
        console.log('Error:', error)
        throw error
      }
    },
    login: async (_, { input }: { input: LoginInput }): Promise<LoginResponse> => {
      const user = await mongodb.manager.findOneBy(User, { username: input.username })

      if (!user) {
        throw new Error('User not found')
      }

      const suppliedHash = SecurityService.generateHash(input.password, user.passwordSalt)

      if (suppliedHash !== user.password) {
        throw new Error('Invalid password')
      }

      const token = SecurityService.signToken(user.id)

      return {
        user,
        token
      }
    }
  }
}
