import React, { ReactNode, useContext, useEffect, useState } from 'react'

// TODO add proper types for all entities and vars

export interface StoreProviderType {
  todos: any[]
  addTodo: (todo: any) => void
  updateTodosList: (todos: any[]) => void
}

const StoreContext = React.createContext({} as StoreProviderType)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<any[]>([])

  const addTodo = (todo: any) => {
    console.log('>>> adding todo', todo)
    setTodos([...todos, todo])
  }

  const updateTodosList = (extraItems: any[]) => {
    console.log('>>> updating todos', extraItems)
    setTodos([...todos, ...extraItems])
  }

  return (
    <StoreContext.Provider value={{ todos, addTodo, updateTodosList }}>
      {children}
    </StoreContext.Provider>
  )
}

export default function useStore() {
  return useContext(StoreContext)
}