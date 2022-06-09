import { mongodb } from '../../dataSources/mongodb'
import { Todo } from './entities/Todo'
import { TodoStatus } from './types/TodoStatus'

export const todoModule = {
  // TODO better resolve of input format. Using { input: ... } does not match graphql types
  Mutation: {
    create: async (_, { input }) => {
      try {
        console.log('> input', input)

        const todo = new Todo()
        todo.text = input.text
        todo.status = TodoStatus.PENDING

        const saved = await mongodb.manager.save(todo)

        return saved
      } catch (err) {
        console.log('Error:', err)
        throw err
      }
    }
  }
}
