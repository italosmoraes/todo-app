import { mongodb } from '../../dataSources/mongodb'
import { User } from './entities/User'

// TODO once we have the todos, create the users module
export const usersModule = {
  Mutation: {
    createUser: async (_, { input }) => {
      try {
        const user = new User()
        user.firstName = input.firstName
        user.lastName = input.lastName
        user.username = input.username

        const saved = await mongodb.manager.save(user)
        console.log('saved?', saved)
        return saved
      } catch (error) {
        console.log('Error:', error)
        throw error
      }
    }
  }
}
