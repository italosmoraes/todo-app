import { SecurityService } from '../../utils/SecurityService'
import { mongodb } from '../../dataSources/mongodb'
import { User } from './entities/User'

// TODO once we have the todos, create the users module
export const usersModule = {
  Mutation: {
    createUser: async (_, { input }) => {
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
    login: async (_, { input }) => {
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
