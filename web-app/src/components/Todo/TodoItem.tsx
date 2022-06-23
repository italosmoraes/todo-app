import React, { useEffect, useState } from 'react'
import useStore from '../../store/StoreProvider'
import styled from 'styled-components'
import { useMutation, useQuery } from '@apollo/client'
import { UPDATE_TODO } from '../../graphql/mutations'

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

export type TodoItemProps = { item: any }

export function TodoItem({ item }: TodoItemProps) {
  const { refetchList } = useStore()

  const [text, setText] = useState(item.text)
  const [confirm, setConfirm] = useState(false)

  // useEffect(() => {
  //   setText(text)
  // }, [item.text])

  const [updateTodo, { data: updateData, loading, error: updateError }] = useMutation(UPDATE_TODO, {
    variables: { input: text }
  })

  useEffect(() => {
    refetchList()
  }, [updateData])

  const markDone = () => {
    updateTodo({ variables: { input: { todoId: item.id, status: 'DONE' } } })
  }

  const handleConfirm = () => {}

  const handleCancel = () => {}

  return (
    <TodoRowContainer key={item.id}>
      <TodoTextField
        key={item.id}
        value={text}
        onChange={(evt) => {
          setText(evt.target.value)
          setConfirm(true)
        }}
      />
      {confirm && <Button>confirm</Button>}
      {confirm && <Button>cancel</Button>}
      <TodoStatusField>{item.status}</TodoStatusField>
      {item.dueAt && <TodoStatusField>{item.dueAt}</TodoStatusField>}
      <Button onClick={() => markDone()}>Done</Button>
      <Button>Delete</Button>
    </TodoRowContainer>
  )
}
