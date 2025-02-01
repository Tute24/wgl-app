'use client'

import RegisterForm from '../../components/Forms/RegistrationForm'
import UnLoggedHeader from '../../components/Headers/UnLoggedHeader'
import { useContextWrap } from '../../contextAPI/context'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'

export default function Register() {
  const { statusMessage, setStatusMessage } = useContextWrap()

  const [usersData, setUsersData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const router = useRouter()

  function UsersInputHandler(event: ChangeEvent<HTMLInputElement>) {
    setUsersData({
      ...usersData,
      [event.target.name]: event.target.value,
    })
  }

  function registrationSubmitHandler(event: FormEvent) {
    event.preventDefault()
    if (usersData.password !== usersData.confirmPassword) {
      setStatusMessage('Passwords must be the same!')
    } else {
      console.log(usersData)
      router.push('/dashboard')
    }
  }

  return (
    <>
      <UnLoggedHeader/>
      <RegisterForm
        usersData={usersData}
        onChange={UsersInputHandler}
        onSubmit={registrationSubmitHandler}
      />
    </>
  )
}
