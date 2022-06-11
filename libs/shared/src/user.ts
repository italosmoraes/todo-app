export interface CreateUserResponse {
  user: User
  token: string
}

export interface CreateUserInput {
  firstName: string
  lastName: string
  username: string
  password: string
}

export interface User {
  firstName: string
  lastName: string
  username: string
}
