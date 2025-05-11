'use client'

import Link from 'next/link'
import InputContainer from '../Common/input-container/input-container'
import { useContextWrap } from '@/contextAPI/context'
import useSignIn from '@/functions/signInFunction'
import UserButton from '../Common/buttons/user-button/user-button'
import { z } from 'zod'
import signInSchema from '@/zodSchemas/signInSchema'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export type usersSignType = {
  email: string
  password: string
}

export type signInData = z.infer<typeof signInSchema>

export default function LoginForm() {
  const { statusMessage } = useContextWrap()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signInData>({
    resolver: zodResolver(signInSchema),
  })

  const onSubmit: SubmitHandler<signInData> = useSignIn()

  return (
    <div className="flex flex-col items-center m-auto">
      <div className="border-solid border-2 border-dustyRose rounded-lg p-3 hover:shadow-xl hover:shadow-dustyRose">
        <div className="flex flex-col justify-center items-center px-7 pb-3 pt-3 m-auto">
          <div className="flex justify-center items-center pb-2 text-mutedTaupe font-bold">
            <h2 className="text-amber-800">Sign in to your account</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputContainer
              id="email"
              type="email"
              label="E-mail"
              {...register('email')}
              placeholder="Sign in with your e-mail"
            />
            {errors.email && (
              <span className="text-red-500 font-bold">
                {errors.email.message}
              </span>
            )}
            <InputContainer
              id="password"
              type="password"
              label="Password"
              {...register('password')}
              placeholder="Type your password"
            />
            {errors.password && (
              <span className="text-red-500 font-bold">
                {errors.password.message}
              </span>
            )}
            <div className="pt-3">
              <UserButton id="submitButton" content="Sign In" type="submit" />
              <span className="text-red-500 font-bold">{statusMessage}</span>
            </div>
          </form>
        </div>
        <div className="text-center">
          <h2 className="font-semibold text-mutedTaupe pb-1">
            {'Are you a new user? '}
            <Link href="/registerPage">
              <span className="text-amber-800 underline">Sign up now!</span>
            </Link>
          </h2>
          <h2 className="font-semibold text-mutedTaupe">
            {'Forgot your password? '}
            <Link href="/forgot-password">
              <span className="text-amber-800 underline">Reset it now!</span>
            </Link>
          </h2>
        </div>
      </div>
    </div>
  )
}
