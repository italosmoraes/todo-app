import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm'
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

  @Column()
  createdAt: Date

  @Column({ nullable: true })
  dueAt?: string // ISO
}
