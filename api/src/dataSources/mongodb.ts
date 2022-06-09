import { Todo } from '../modules/Todo/entities/Todo'
import { DataSource } from 'typeorm'
import { User } from '../modules/Users/entities/User'

// TODO resolve host, user, pass, db from env variables, as per actual environment

export const mongodb = new DataSource({
  type: 'mongodb',
  host: 'localhost',
  database: 'local',
  synchronize: true,
  logging: true,
  entities: [Todo, User],
  subscribers: [],
  migrations: []
})
