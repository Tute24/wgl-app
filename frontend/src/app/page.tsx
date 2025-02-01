'use client'

import LoginForm from '../components/Forms/LoginForm'
import UnLoggedHeader from '../components/Headers/UnLoggedHeader'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'

export default function Login() {
  const [usersSign, setUsersSign] = useState({
    email: '',
    password: '',
  })

  const router = useRouter()

  function loginInputHandler(event: ChangeEvent<HTMLInputElement>) {
    setUsersSign({
      ...usersSign,
      [event.target.name]: event.target.value,
    })
  }

  function loginSubmitHandler(event: FormEvent) {
    event.preventDefault()
    console.log(usersSign)
    router.push('/dashboard')
  }

  return (
    <>
      <UnLoggedHeader />
      <LoginForm
        usersSign={usersSign}
        onChange={loginInputHandler}
        onSubmit={loginSubmitHandler}
      />
    </>
  )
}
