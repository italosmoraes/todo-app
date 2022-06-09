import { Entity, Column, ObjectIdColumn } from 'typeorm'
import { ObjectId } from 'mongodb'
import { TodoStatus } from '../types/TodoStatus'

@Entity()
export class Todo {
  @ObjectIdColumn()
  id: ObjectId

  @Column()
  userId: ObjectId

  @Column()
  text: string

  @Column()
  status: TodoStatus
}
