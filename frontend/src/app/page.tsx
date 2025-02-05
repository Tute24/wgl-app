'use client'

import axios from 'axios'
import LoginForm from '../components/Forms/LoginForm'
import UnLoggedHeader from '../components/Headers/UnLoggedHeader'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useContextWrap } from '@/contextAPI/context'

export default function Login() {
  const [usersSign, setUsersSign] = useState({
    email: '',
    password: '',
  })

  const { statusMessage, setStatusMessage } = useContextWrap()

  const router = useRouter()

  function loginInputHandler(event: ChangeEvent<HTMLInputElement>) {
    setUsersSign({
      ...usersSign,
      [event.target.name]: event.target.value,
    })
  }

  async function loginSubmitHandler(event: FormEvent) {
    event.preventDefault()

    try {
      const response = await axios.post(
        'http://localhost:3000/logIn',
        usersSign
      )
      if (response.status === 200) {
        const userToken = response.data.token
        localStorage.setItem('userToken',JSON.stringify(userToken))
        router.push('/dashboard')
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setStatusMessage(`This email doesn't belong to an existent user`)
        }
        if (error.response?.status === 403){
          setStatusMessage('Incorrect password.')
        }
        if (error.response?.status === 500) {
          setStatusMessage('Something went wrong. Try again!')
        }
      }
      console.log(error)
    }
  }

  return (
    <>
      <UnLoggedHeader />
      <LoginForm
        usersSign={usersSign}
        onChange={loginInputHandler}
        onSubmit={loginSubmitHandler}
        statusMessage={statusMessage}
      />
    </>
  )
}
