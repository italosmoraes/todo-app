import { BaseContext } from 'apollo-server-types'
import { ObjectId } from 'mongodb'
import { mongodb } from '../../dataSources/mongodb'
import { Todo } from './entities/Todo'
import { TodoStatus } from './types/TodoStatus'
import { ObjectID } from 'typeorm'
import { ApolloError } from 'apollo-server-core'
import { AuthService } from '../../services/AuthService'
import { TodoCreateInput, UpdateTodoInput } from '@todo-app/shared-types'

export const todoModule = {
  // TODO better resolve of input format. Using { input: ... } does not match graphql types
  Query: {
    todos: async (_, {}, context: BaseContext): Promise<Todo[]> => {
      const { userId } = AuthService.authenticate(context.request)

      if (!userId) {
        throw new ApolloError('Authentication needed')
      }

      const records = await mongodb.manager.find(Todo, {
        // @ts-ignore cannot resolve _id type as ObjectId from mongodb
        where: { userId: new ObjectId(userId) }
      })

      // TODO  return paginated list?
      return records
    }
  },

  Mutation: {
    createTodo: async (
      _,
      { input }: { input: TodoCreateInput },
      context: BaseContext
    ): Promise<Todo> => {
      try {
        const { userId } = AuthService.authenticate(context.request)

        if (!userId) {
          throw new ApolloError('Authentication needed')
        }

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
    updateTodo: async (
      _,
      { input }: { input: UpdateTodoInput },
      context: BaseContext
    ): Promise<Todo> => {
      const { userId } = AuthService.authenticate(context.request)

      if (!userId) {
        throw new ApolloError('Authentication needed')
      }

      const record = await mongodb.manager.findOne(Todo, {
        // @ts-ignore cannot resolve _id type as ObjectId from mongodb
        where: { _id: new ObjectId(input.todoId) }
      })
      console.log(record)
      if (!record) {
        throw new ApolloError('Todo not found')
      }

      record.status = input.status || record.status
      record.text = input.text || record.text

      await mongodb.manager.save(record)

      return record
    }
  }
}
