import { BaseContext } from 'apollo-server-types'
import { ObjectId } from 'mongodb'
import { mongodb } from '../../dataSources/mongodb'
import { Todo } from './entities/Todo'
import { TodoStatus } from './types/TodoStatus'
import { ObjectID } from 'typeorm'
import { ApolloError } from 'apollo-server-core'
import { AuthService } from '../../services/AuthService'
import { TodoCreateInput, UpdateTodoInput } from '@todo-app/shared-types'
import { DateTime } from 'luxon'

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
        where: { userId: new ObjectId(userId) },
        order: { createdAt: 'DESC' }
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
        todo.dueAt = input.dueAt
        todo.createdAt = DateTime.now().toUTC().toJSDate()

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

      // TODO mongodb.manager is stupid and one needs to find the item to verify it exists first
      // loads of silly repetitions below, because of siliness on how to update
      // cant use manage.save() without instantiating a new Todo() - wtf?!

      const record = await mongodb.manager.findOne(Todo, {
        // @ts-ignore cannot resolve _id type as ObjectId from mongodb
        where: { _id: new ObjectId(input.todoId) }
      })

      if (!record) {
        throw new ApolloError('Todo not found')
      }

      try {
        await mongodb.manager.update(Todo, new ObjectId(input.todoId), {
          status: input.status || record.status,
          text: input.text || record.text, // TODO guard : ensure not empty
          dueAt: input.dueAt || record.dueAt // TODO ensure this is a date
        })

        const saved = await mongodb.manager.findOne(Todo, {
          // @ts-ignore cannot resolve _id type as ObjectId from mongodb
          where: { _id: new ObjectId(input.todoId) }
        })

        if (!saved) {
          throw new ApolloError('Todo not found')
        }

        return saved
      } catch (error) {
        throw new ApolloError(error.message, error.code)
      }
    }
  }
}
