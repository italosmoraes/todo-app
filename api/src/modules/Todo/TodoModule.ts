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

      // TODO fix stupid typeorm not letting me simply save the entity and get it back to return

      try {
        await mongodb.manager.update(Todo, new ObjectId(input.todoId), {
          status: input.status,
          text: input.text,
          dueAt: input.dueAt
        })

        const record = await mongodb.manager.findOne(Todo, {
          // @ts-ignore cannot resolve _id type as ObjectId from mongodb
          where: { _id: new ObjectId(input.todoId) }
        })

        if (!record) {
          throw new ApolloError('Todo not found')
        }

        return record
      } catch (error) {
        throw new ApolloError(error.message, error.code)
      }
    }
  }
}
