import { useQuery } from '@apollo/client'
import React, { ReactNode, useContext, useEffect, useState } from 'react'
import useAuth from '../auth/AuthProvider'
import { QUERY_MY_TODOS } from '../graphql/queries'

// TODO add proper types for all entities and vars

export interface StoreProviderType {
  todos: any[]
  addTodo: (todo: any) => void
  updateTodosList: (todos: any[]) => void
}

const StoreContext = React.createContext({} as StoreProviderType)

// TODO there could be a store for reach type of entity e.g. UserStore, TodosStore
export function StoreProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<any[]>([])
  const { isLoggedIn } = useAuth()

  const { data: todosData, loading, error, refetch } = useQuery(QUERY_MY_TODOS)

  useEffect(() => {
    refetch()
  }, [isLoggedIn])

  useEffect(() => {
    if (todosData && todosData.todos) {
      updateTodosList([...todos, ...todosData.todos])
    }
  }, [todosData])

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
