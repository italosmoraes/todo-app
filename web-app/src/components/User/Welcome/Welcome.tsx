import { useMutation, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { CREATE_USER } from '../../../graphql/mutations'
import styled from 'styled-components'
import { Signup } from '../Signup/Signup'

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin: 25px;
  max-width: 500px;
`

export const Welcome = () => {
  // read auth token from store or from local storage
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (window.localStorage.getItem('token')) {
      setIsLoggedIn(true)
      // TODO handle user redirect
    }
  }, [])

  const [createUser, { data: createUserData, loading, error }] = useMutation(CREATE_USER)

  const handleSignup = (formData) => {
    console.log('>>> signup', formData)
    // validate form data and inform Signup component
    createUser({
      variables: {
        input: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.username,
          password: formData.password
        }
      }
    })
  }

  useEffect(() => {
    if (error) {
      console.log('Error', error)
    }

    if (createUserData && createUserData.createUser && createUserData.createUser.token) {
      window.localStorage.setItem('token', createUserData.createUser.token)
    }

    // call store to login user and lead to the TODO dashboard
  }, [createUserData])

  return (
    <WelcomeContainer>
      {isLoggedIn && <p>welcome logged in user</p>}
      {!isLoggedIn && (
        <>
          <p>welcome, signup or login to start doing stuff</p>
          <Signup handleSignup={handleSignup} />
        </>
      )}
    </WelcomeContainer>
  )
}
