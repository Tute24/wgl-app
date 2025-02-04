'use client'

import RegisterForm from '../../components/Forms/RegistrationForm'
import UnLoggedHeader from '../../components/Headers/UnLoggedHeader'
import { useContextWrap } from '../../contextAPI/context'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'
import axios from 'axios'
import Error from 'next/error'
import { error } from 'console'

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

  async function registrationSubmitHandler(event: FormEvent) {
    event.preventDefault()
    if (usersData.password !== usersData.confirmPassword) {
      setStatusMessage('Passwords must be the same!')
    } else{

    try{
      const response = await axios.post(
        'http://localhost:3000/createUser',
        usersData
      )
    
      if (response.status === 200) {
        router.push('/dashboard')
      }
    }catch(error:unknown){
      if(axios.isAxiosError(error)){
        if(error.response?.status === 409){
          setStatusMessage('There is already an existent user with this email!')
        }
        if(error.response?.status === 500){
          setStatusMessage('Something went wrong within the server. Try again sonn.')
        }
        console.log(error)
      }
      console.log(error)
    }
  }
  }

  return (
    <>
      <UnLoggedHeader />
      <RegisterForm
        usersData={usersData}
        onChange={UsersInputHandler}
        onSubmit={registrationSubmitHandler}
        statusMessage={statusMessage}
      />
    </>
  )
}
