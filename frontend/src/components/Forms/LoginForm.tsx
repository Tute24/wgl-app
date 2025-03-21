'use client'

import { ChangeEvent, useState } from 'react'
import Link from 'next/link'
import InputContainer from '../Common/input-container/input-container'
import SubmitButton from '../Common/buttons/submit-button/submit-button'
import { useContextWrap } from '@/contextAPI/context'
import useSignIn from '@/functions/signInFunction'

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
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex justify-center items-center">
        <div className="flex items-center w-full"></div>
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
            <SubmitButton id="submitButton" title="Sign in" />
            <span className="text-red-500 font-bold">{statusMessage}</span>
          </div>
        </form>
      </div>
      <div className="text-center">
        <span className="font-semibold text-mutedTaupe">
          Are you a new user?
          <Link href="/registerPage">
            <span className="text-amber-800 underline">Sign up now!</span>
          </Link>
        </span>
      </div>
    </div>
  )
}
