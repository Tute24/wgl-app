'use client'

import LoginForm from '@/components/Forms/LoginForm'
import UnLoggedHeader from '@/components/Headers/UnLoggedHeader'
import { ChangeEvent, FormEvent, useState } from 'react'

export default function Login() {

  const [usersSign, setUsersSign] = useState({
    email:'',
    password: ''
  })

  function loginInputHandler(event: ChangeEvent<HTMLInputElement>) {
      setUsersSign( {
        ...usersSign,
        [event.target.name]: event.target.value,
      })
    }
  
    function loginSubmitHandler(event: FormEvent) {
      event.preventDefault()
      console.log(usersSign)
    }

  return (
    <>
      <UnLoggedHeader/>
      <LoginForm
      usersSign={usersSign}
      onChange={loginInputHandler}
      onSubmit={loginSubmitHandler}
      />
    </>
  )
}
