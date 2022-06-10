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

const TodoTextField = styled.input`
  font-size: 14px;
  padding: 10px;
  background: #ae85a8;
  border: none;
  border-radius: 5px;
  height: 25px;
`

const TodoStatusField = styled.div`
  font-size: 15px;
  font-weight: 150;
  font-style: italic;
  padding: 10px;
  background: #ae85a8;
  border: none;
  border-radius: 5px;
  height: 25px;
`

export type TodoListProps = {}

export function TodoList(props: TodoListProps) {
  const { todos, updateTodosList } = useStore()

  return (
    <AddTodoContainer>
      {todos.length > 0 &&
        todos.map((item) => (
          <TodoRowContainer key={item.id}>
            <TodoTextField key={item.id} value={item.text} />
            <TodoStatusField>{item.status}</TodoStatusField>
            <Button>Done</Button>
            <Button>Delete</Button>
          </TodoRowContainer>
        ))}
    </AddTodoContainer>
  )
}
