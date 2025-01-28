"use client"

import RegisterForm from '@/components/Forms/RegistrationForm'
import UnLoggedHeader from '@/components/Headers/UnLoggedHeader'
import { ChangeEvent, FormEvent, useState } from 'react'

export default function Register() {
  const [usersData, setUsersData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  function UsersInputHandler(event: ChangeEvent<HTMLInputElement>) {
    setUsersData( {
      ...usersData,
      [event.target.name]: event.target.value,
    })
  }

  function registrationSubmitHandler(event: FormEvent) {
    event.preventDefault()
    console.log(usersData)
  }

  return (
    <>
      <UnLoggedHeader />
      <RegisterForm
        usersData={usersData}
        onChange={UsersInputHandler}
        onSubmit={registrationSubmitHandler}
      />
    </>
  )
}
