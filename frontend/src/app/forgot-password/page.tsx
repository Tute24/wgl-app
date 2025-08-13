'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import useSendPasswordResetRequest from './(hooks)/useSendPasswordResetRequest'
import UnLoggedHeader from '../(components)/headers/unlogged-header'
import InputContainer from '../(components)/Common/input-container/input-container'
import UserButton from '../(components)/Common/buttons/user-button/user-button'
import { Spinner } from '../(components)/Common/spinner/spinner'
import { useGeneralStore } from '@/stores/general/general.provider'
import { useShallow } from 'zustand/shallow'

export const emailSchema = z.object({
  email: z.string().email(),
})

type userEmail = z.infer<typeof emailSchema>

export default function SendMail() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<userEmail>({
    resolver: zodResolver(emailSchema),
  })
  const { statusMessage } = useGeneralStore(
    useShallow((store) => ({
      statusMessage: store.statusMessage,
    })),
  )
  const sendPasswordResetRequest = useSendPasswordResetRequest()
  const onSubmit: SubmitHandler<userEmail> = sendPasswordResetRequest
  return (
    <>
      <UnLoggedHeader />
      <div className="flex flex-col justify-center m-auto items-center">
        <div className=" w-[350px] border-solid border-2 border-dustyRose rounded-lg hover:shadow-xl hover:shadow-dustyRose">
          <div>
            <h1 className="text-amber-800 font-bold text-start px-3 py-2 text-xl">
              FORGOT YOUR PASSWORD?
            </h1>
            <hr className="border-solid border-1 border-mutedTaupe py-2" />
            <h2 className="text-amber-800 font-bold flex justify-start pb-3 px-3">
              Enter your email and we'll send you password reset instructions.
            </h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="pb-3 px-3">
              <InputContainer
                {...register('email')}
                label="Email Address"
                type="email"
              />
              {errors.email && (
                <span className="text-red-500 font-bold">
                  {errors.email.message}
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
                content={isSubmitting ? <Spinner /> : 'Confirm'}
                disabled={isSubmitting}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
