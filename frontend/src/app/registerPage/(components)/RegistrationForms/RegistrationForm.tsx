'use client'

import useSubmitRegister from '@/app/registerPage/(hooks)/useSubmitRegister'
import InputContainer from '@/components/Common/input-container/input-container'
import SubmitButton from '@/components/Common/buttons/submit-button/submit-button'
import { useContextWrap } from '@/contextAPI/context'
import usersDataSchema from '@/zodSchemas/usersDataSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

type usersData = z.infer<typeof usersDataSchema>

export default function RegisterForm() {
  const { statusMessage } = useContextWrap()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<usersData>({
    resolver: zodResolver(usersDataSchema),
  })
  const submitRegister = useSubmitRegister()
  const onSubmit: SubmitHandler<usersData> = submitRegister

  return (
    <>
      <div className="flex flex-col items-center m-auto">
        <div className="border-solid border-2 border-dustyRose rounded-lg p-3 hover:shadow-xl hover:shadow-dustyRose">
          <div className="font-sans px-7 pb-3 pt-3 m-auto ">
            <div className="flex justify-center items-center pb-2 text-mutedTaupe font-bold">
              <h2 className="text-amber-800">Create your account</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">
              <InputContainer
                label="Your first name"
                type="text"
                id="firstName"
                placeholder="Type your first name"
                {...register('firstName')}
              />
              <InputContainer
                label="Your last name"
                type="text"
                id="lastName"
                placeholder="Type your last name"
                {...register('lastName')}
              />
              <div className="gap-2">
                <InputContainer
                  label="Type a valid e-mail address"
                  type="email"
                  id="email"
                  placeholder="Insert your e-mail"
                  {...register('email')}
                />
                {errors.email && (
                  <span className="text-red-500 font-bold">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="gap-2">
                <InputContainer
                  label="Type your password"
                  type="password"
                  id="password"
                  placeholder="Create your password"
                  {...register('password')}
                />
                {errors.password && (
                  <span className="text-red-500 font-bold">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="gap-2">
                <InputContainer
                  label="Confirm your password"
                  type="password"
                  id="newPasswordAuth"
                  placeholder="Confir your password"
                  {...register('confirmPassword')}
                />
                {errors.confirmPassword && (
                  <span className="text-red-500 font-bold">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col pt-2 flex-grow">
                <SubmitButton id="registerButton" title="Sign Up!" />
                <span className="text-red-500 font-bold">{statusMessage}</span>
              </div>
              <div className="flex justify-center items-center mt-2">
                <h2 className="font-bold text-mutedTaupe">
                  Already registered?{' '}
                  <Link href="/">
                    <span className="font-bold text-amber-800 underline">
                      Sign in!
                    </span>
                  </Link>
                </h2>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
