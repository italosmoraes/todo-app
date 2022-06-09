import { BaseContext } from 'apollo-server-types'
import { ObjectId } from 'mongodb'
import { authenticate } from '../../server'
import { mongodb } from '../../dataSources/mongodb'
import { Todo } from './entities/Todo'
import { TodoStatus } from './types/TodoStatus'

export const todoModule = {
  // TODO better resolve of input format. Using { input: ... } does not match graphql types
  Query: {
    todos: async (_, {}) => {
      // resolve user from context
      // get all the todos
      // return paginated list?
    }
  },

  Mutation: {
    createTodo: async (_, { input }, context: BaseContext) => {
      try {
        console.log('req.headers?.authorization?.split', context.request.headers)

        const { userId } = authenticate(context.request)

        const todo = new Todo()
        todo.userId = new ObjectId(userId)
        todo.text = input.text
        todo.status = TodoStatus.PENDING

        const saved = await mongodb.manager.save(todo)

        return saved
      } catch (err) {
        console.log('Error:', err)
        throw err
      }
    },
    updateTodo: async (_, { input }) => {
      console.log(input)
      // find by id
      // verify user is owner
      // update text and/or status
    }
  }
}
