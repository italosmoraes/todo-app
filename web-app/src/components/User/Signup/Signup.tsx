import styled from 'styled-components'
import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'

const SignupForm = styled.div`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  padding: 10px;
`

const FormItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: center;
  align-items: center;
  max-width: 400px;
  margin-bottom: 10px;
  margin-top: 10px;
`

const ConfirmBtn = styled.div`
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

const FormInput = styled.input`
  font-size: 12px;
  padding: 10px;
  background: yellow;
  border: none;
  border-radius: 3px;
`

type Props = {
  handleSignup: Function
}

export const Signup = ({ handleSignup }: Props) => {
  const [formData, updateFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: ''
  })

  useEffect(() => {
    console.log('formData:', formData)
    // TODO validate updated field as per set rules
  }, [formData])

  return (
    <SignupForm>
      <FormItem>
        {' '}
        First name:{' '}
        <FormInput
          name="firstName"
          type="text"
          value={formData.firstName}
          onChange={(elem) =>
            updateFormData({
              ...formData,
              firstName: elem.target.value
            })
          }
          maxLength={100}
          size={30}
        />{' '}
      </FormItem>
      <FormItem>
        Last name:{' '}
        <FormInput
          name="lastName"
          type="text"
          value={formData.lastName}
          onChange={(elem) =>
            updateFormData({
              ...formData,
              lastName: elem.target.value
            })
          }
          maxLength={100}
          size={30}
        />
      </FormItem>
      <FormItem>
        Username:{' '}
        <FormInput
          name="username"
          type="text"
          value={formData.username}
          onChange={(elem) =>
            updateFormData({
              ...formData,
              username: elem.target.value
            })
          }
          maxLength={50}
          size={30}
        />
      </FormItem>
      <FormItem>
        Password:{' '}
        <FormInput
          name="password"
          type="text"
          value={formData.password}
          onChange={(elem) =>
            updateFormData({
              ...formData,
              password: elem.target.value
            })
          }
          maxLength={50}
          size={30}
        />
      </FormItem>
      <ConfirmBtn id="confirmSignup" onClick={() => handleSignup(formData)}>
        confirm
      </ConfirmBtn>
    </SignupForm>
  )
}
