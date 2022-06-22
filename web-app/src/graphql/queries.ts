import { gql } from '@apollo/client'

export const QUERY_MY_TODOS = gql`
  query Todos {
    todos {
      id
      text
      status
      dueAt
    }
  }
`
