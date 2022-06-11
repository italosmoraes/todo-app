import { User} from './user'

export interface LoginResponse {
  user: User
  token: string
}

export interface LoginInput {
  username: string
  password: string
}
