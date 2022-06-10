import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import useStore from '../../store/StoreProvider'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_TODO } from '../../graphql/mutations'
import { QUERY_MY_TODOS } from '../../graphql/queries'

const AddTodoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  padding: 10px;
`

const TodoRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: center;
  align-items: center;
  margin: 10px;
`

const Button = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  font-weight: bold;
  margin: 10px;
  width: 100px;
  height: 40px;
  background: gray;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`

const TodoInputField = styled.input`
  font-size: 16px;
  padding: 10px;
  background: yellow;
  border: none;
  border-radius: 3px;
  height: 25px;
`

export type TodoListProps = {}

export function TodoList(props: TodoListProps) {
  const { todos, updateTodosList } = useStore()

  //   const [todosList, setTodosList] = useState<any[]>([])

  const { data: todosData, loading, error, refetch } = useQuery(QUERY_MY_TODOS)

  useEffect(() => {
    if (todosData && todosData.todos) {
      updateTodosList(todosData.todos) // update store
    }
  }, [todosData])

  //   useEffect(() => {}, [todos])

  return (
    <AddTodoContainer>
      {todos.map((item) => (
        <TodoRowContainer>{JSON.stringify(item)}</TodoRowContainer>
      ))}
    </AddTodoContainer>
  )
}
