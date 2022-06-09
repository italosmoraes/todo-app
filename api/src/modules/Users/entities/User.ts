import { ObjectId } from 'mongodb'
import { Column, Entity, ObjectIdColumn } from 'typeorm'

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectId

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  username: string
}
