import { gql } from '@apollo/client'

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      token
      user {
        username
      }
    }
  }
`

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        username
      }
    }
  }
`

export const CREATE_TODO = gql`
  mutation Create($input: TodoCreateInput!) {
    createTodo(input: $input) {
      id
      text
      status
    }
  }
`

export const UPDATE_TODO = gql`
  mutation UpdateTodo($input: UpdateTodoInput!) {
    updateTodo(input: $input) {
      id
      text
      status
    }
  }
`
