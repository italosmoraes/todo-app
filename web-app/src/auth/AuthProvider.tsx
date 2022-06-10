import React, { ReactNode, useContext, useEffect, useState } from 'react'

export interface AuthContextType {
  username?: string
  userId?: string
  token?: string
  isLoggedIn: boolean
  setAuthToken: (authToken: string) => void
  // login: (email: string, password: string) => void;
  // signUp: (..., usernam: string, password: string) => void;
  // logout: () => void;
}

const AuthContext = React.createContext({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [token, setToken] = useState<any>(null)
  const [username, setUsername] = useState<any>(null)
  const [userId, setUserId] = useState<any>(null)

  useEffect(() => {
    // TODO verify if token still valid
    // if not, ask for new login
    const token = window.localStorage.getItem('token')

    if (!token) {
      return
    }

    setToken(token)
    setIsLoggedIn(true)
  }, [])

  const setAuthToken = (authToken) => {
    window.localStorage.setItem('token', authToken)
    setToken(authToken)
    setIsLoggedIn(true)
  }

  return (
    <AuthContext.Provider value={{ token, username, userId, setAuthToken, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}
