import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import useStore from '../../store/StoreProvider'
import { useMutation } from '@apollo/client'
import { CREATE_TODO } from '../../graphql/mutations'

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

export type AddTodoProps = {}

export function AddTodo(props: AddTodoProps) {
  const { addTodo } = useStore()

  const [todoMutation, { loading, error }] = useMutation<{ createTodo: any }>(CREATE_TODO)

  const [todo, setTodo] = useState<any>()

  const [dueAt, setDueAt] = useState<string | null>(null)

  const handleAdd = async (todo: any) => {
    const result = await todoMutation({ variables: { input: { text: todo, dueAt } } })

    if (result.data) {
      addTodo(result.data.createTodo)

      // TODO clear the input field
    }
  }

  return (
    <AddTodoContainer>
      <TodoRowContainer>
        <TodoInputField size={50} onChange={(evt) => setTodo(evt.target.value)} />{' '}
        {/* <TodoInputField size={20} onChange={(evt) => setDueAt(evt.target.value)} />{' '} */}
        <Button onClick={() => handleAdd(todo)}>ADD</Button>
      </TodoRowContainer>
    </AddTodoContainer>
  )
}
