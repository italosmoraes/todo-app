import { Todo } from '../modules/Todo/entities/Todo'
import { DataSource } from 'typeorm'
import { User } from '../modules/Users/entities/User'
import { MONGODB_HOST, MONGO_DB_NAME } from '../../config/env'

// TODO resolve host, user, pass, db from env variables, as per actual environment

export const mongodb = new DataSource({
  type: 'mongodb',
  host: MONGODB_HOST,
  database: MONGO_DB_NAME,
  synchronize: true,
  logging: true,
  entities: [Todo, User],
  subscribers: [],
  migrations: []
})
