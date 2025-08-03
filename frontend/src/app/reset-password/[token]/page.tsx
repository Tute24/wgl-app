'use client'
import UserButton from '@/app/(components)/Common/buttons/user-button/user-button'
import InputContainer from '@/app/(components)/Common/input-container/input-container'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import useSubmitPasswordReset from './(hooks)/useSubmitPasswordReset'
import { useContextWrap } from '@/contextAPI/context'
import { Spinner } from '@/app/(components)/Common/spinner/spinner'
import UnLoggedHeader from '@/app/(components)/headers/unlogged-header'

const passwordSchema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must be equal!',
    path: ['confirmPassword'],
  })

export type newPassword = z.infer<typeof passwordSchema>

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<newPassword>({
    resolver: zodResolver(passwordSchema),
  })
  const { statusMessage } = useContextWrap()

  const onSubmit: SubmitHandler<newPassword> = useSubmitPasswordReset()
  return (
    <>
      <UnLoggedHeader />
      <div className="flex flex-col justify-center m-auto items-center">
        <div className=" w-[350px] border-solid border-2 border-dustyRose rounded-lg hover:shadow-xl hover:shadow-dustyRose">
          <div>
            <h1 className="text-amber-800 font-bold text-start px-3 py-2 text-xl">
              PASSWORD RESET
            </h1>
            <hr className="border-solid border-1 border-mutedTaupe py-2" />
            <h2 className="text-amber-800 font-bold flex justify-start pb-3 px-3">
              Type your new password.
            </h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="pb-3 px-3">
              <InputContainer
                {...register('password')}
                label="New Password"
                type="password"
              />
              {errors.password && (
                <span className="text-red-500  text-center">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="pb-3 px-3">
              <InputContainer
                {...register('confirmPassword')}
                label="Confirm your new password"
                type="password"
              />
              {errors.confirmPassword && (
                <span className="text-red-500  text-center items-center">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            <div className="px-3">
              <span
                className={`${
                  statusMessage ===
                  'If an account with that email exists, a password reset link has been sent. Please check your inbox.'
                    ? 'text-green-500'
                    : 'text-red-500'
                }`}
              >
                {statusMessage}
              </span>
            </div>
            <div className="pt-3 pb-3 px-3">
              <UserButton
                content={isSubmitting ? <Spinner /> : 'Confirm Password Reset'}
                disabled={isSubmitting}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
