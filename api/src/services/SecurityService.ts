import { JWT_SECRET } from '../../config/env'
import { createHash, randomBytes } from 'crypto'
import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb'

export class SecurityService {
  static generateHash(password: string, salt: string): string {
    return createHash('sha256').update(`${salt}:${password}`).digest('hex')
  }

  static generatePasswordSalt(): string {
    return randomBytes(32).toString('hex')
  }

  static hashPassword(password: string) {
    const salt = this.generatePasswordSalt()
    const hash = this.generateHash(password, salt)

    return {
      salt,
      hash
    }
  }

  static signToken(userId: ObjectId) {
    return jwt.sign({ userId: userId.toString() }, JWT_SECRET, {
      expiresIn: '30d'
    })
  }
}
