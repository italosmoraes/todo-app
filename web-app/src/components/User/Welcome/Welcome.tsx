import { ApolloError, useMutation, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { CREATE_USER, LOGIN } from '../../../graphql/mutations'
import styled from 'styled-components'
import { Signup } from '../Signup/Signup'
import { LoginForm } from '../Login/LoginForm'
import useAuth from '../../../auth/AuthProvider'

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin: 25px;
  max-width: 500px;
  max-height: 800px;
  height: 100%:
`

const ActionBtn = styled.div`
  margin: 10px;
  width: 100%;
  max-width: 200px;
  height: 100%;
  max-height: 100px;
  background: gray;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
`

export const Welcome = () => {
  // read auth token from store or from local storage
  const { setAuthToken, updateUsername } = useAuth()

  const [showSignUpForm, setShowSignUp] = useState(false)
  const [showLogin, setShowLogin] = useState(true)
  const [showError, setShowError] = useState(false)
  const [error, setError] = useState()

  const [createUser, { data: createUserData, loading, error: signupError }] =
    useMutation(CREATE_USER)

  const [login, { data: loginData, loading: loadingLogin, error: loginError }] = useMutation(LOGIN)

  const handleSignup = (formData) => {
    console.log('>>> signup', formData)
    // TODO validate form data and inform Signup component
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

  const handleLogin = (formData) => {
    console.log('>>> login', formData)
    // TODO validate form data and inform Login component

    login({
      variables: {
        input: {
          username: formData.username,
          password: formData.password
        }
      }
    })
  }

  useEffect(() => {
    if (loginData && loginData.login.token) {
      setAuthToken(loginData.login.token)
      updateUsername(loginData.login.user.username)
    }
  }, [loginData])

  useEffect(() => {
    if (createUserData && createUserData.createUser.token) {
      setAuthToken(createUserData.createUser.token)
      updateUsername(createUserData.createUser.user.username)
    }
    // call store to login user and lead to the TODO dashboard
  }, [createUserData])

  // const err = {
  //   graphQLErrors: [],
  //   clientErrors: [],
  //   networkError: {
  //     name: 'ServerError',
  //     response: {},
  //     statusCode: 500,
  //     result: {
  //       errors: [{ message: 'Invalid password', extensions: { code: 'err.apollo' } }],
  //       data: null
  //     }
  //   },
  //   message: 'Response not successful: Received status code 500'
  // }

  useEffect(() => {
    const err = loginError || signupError

    setShowError(true)

    // @ts-ignore create a proper type since the API is ALWAYS returning 500 and screwing up the FE
    if (err && err.networkError && err.networkError.result.errors[0].message) {
      //@ts-ignore same as above
      setError(err.networkError.result.errors[0].message)
    }
  }, [loginError, signupError])

  return (
    <WelcomeContainer>
      {showLogin && <LoginForm handleLogin={handleLogin} />}

      {showSignUpForm && !showLogin && (
        <ActionBtn
          onClick={() => {
            setShowLogin(true)
            setShowSignUp(false)
          }}
        >
          LOGIN
        </ActionBtn>
      )}

      {loginError && showError && <p>{error}</p>}

      <ActionBtn
        onClick={() => {
          setShowSignUp(true)
          setShowLogin(false)
        }}
      >
        SIGN UP
      </ActionBtn>

      {showSignUpForm && (
        <>
          <p>welcome, signup or login to start doing stuff</p>
          <Signup handleSignup={handleSignup} />
        </>
      )}

      {signupError && showError && <p>{error}</p>}
    </WelcomeContainer>
  )
}
