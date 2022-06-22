import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import useStore from '../../store/StoreProvider'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_TODO } from '../../graphql/mutations'
import { QUERY_MY_TODOS } from '../../graphql/queries'
import { TodoItem } from './TodoItem'

const AddTodoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  padding: 10px;
`

export type TodoListProps = {}

export function TodoList(props: TodoListProps) {
  const { todos } = useStore()

  return (
    <AddTodoContainer>
      {todos.map((item) => (
        <TodoItem item={item} key={item.id} />
      ))}
    </AddTodoContainer>
  )
}
