'use client'

import { ChangeEvent, useState } from 'react'
import Link from 'next/link'
import InputContainer from '../Common/input-container/input-container'
import { useContextWrap } from '@/contextAPI/context'
import useSignIn from '@/functions/signInFunction'
import UserButton from '../Common/buttons/user-button/user-button'

export type usersSignType = {
  email: string
  password: string
}

export default function LoginForm() {
  const { statusMessage } = useContextWrap()
  const [usersSign, setUsersSign] = useState<usersSignType>({
    email: '',
    password: '',
  })
  const signIn = useSignIn(usersSign)

  function loginInputHandler(event: ChangeEvent<HTMLInputElement>) {
    setUsersSign({
      ...usersSign,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <div className="flex flex-col items-center m-auto">
      <div className='border-solid border-2 border-dustyRose rounded-lg p-3 hover:shadow-xl hover:shadow-dustyRose'>
      <div className="flex flex-col justify-center items-center px-7 pb-3 pt-3 m-auto">
        <div className="flex justify-center items-center pb-2 text-mutedTaupe font-bold">
        <h2 className="text-amber-800">Sign in to your account</h2>
        </div>
        <form onSubmit={signIn}>
          <InputContainer
            id="email"
            type="email"
            label="E-mail"
            name="email"
            value={usersSign.email}
            onChange={loginInputHandler}
            placeholder="Sign in with your e-mail"
          />
          <InputContainer
            id="password"
            type="password"
            label="Password"
            name="password"
            value={usersSign.password}
            onChange={loginInputHandler}
            placeholder="Type your password"
          />
          <div className="py-4">
            <UserButton id="submitButton" content="Sign In" type="submit" />
            <span className="text-red-500 font-bold">{statusMessage}</span>
          </div>
        </form>
      </div>
      <div className="text-center">
        <span className="font-semibold text-mutedTaupe">
          Are you a new user?
          <Link href="/registerPage">
            <span className="text-amber-800 underline"> Sign up now!</span>
          </Link>
        </span>
      </div>
      </div>
    </div>
  )
}
