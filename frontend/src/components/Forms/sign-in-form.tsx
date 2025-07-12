'use client'

import Link from 'next/link'
import { useContextWrap } from '@/contextAPI/context'
import useSignIn from '@/functions/useSignIn'
import { z } from 'zod'
import signInSchema from '@/zodSchemas/signInSchema'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Spinner } from '../Common/spinner/spinner'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { Button } from '../ui/button'

export type usersSignType = {
  email: string
  password: string
}

export type signInData = z.infer<typeof signInSchema>

export default function SignInForm() {
  const { statusMessage } = useContextWrap()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<signInData>({
    resolver: zodResolver(signInSchema),
  })

  const onSubmit: SubmitHandler<signInData> = useSignIn()

  return (
    <div className="flex flex-col items-center justify-center m-auto h-screen">
      <Card className="border-amber-800 hover:shadow-md hover:shadow-amber-800">
        <CardHeader>
          <CardTitle className="!text-amber-800 text-bold text-xl font-inter text-center">
            Sign in to your account below
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-start gap-3 font-inter w-full">
              <div className="flex flex-col gap-2 items-start justify-start w-full">
                <Label className="text-md text-stone-700">
                  Enter your e-mail
                </Label>
                <Input
                  className="!text-md !text-amber-800 !placeholder-amber-800"
                  type="text"
                  {...register('email')}
                  placeholder="Your e-mail here"
                />
                {errors.email && (
                  <p className="font-inter text-red-600 text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 items-start justify-start w-full">
                <div className="flex flex-row justify-between gap-10 items-baseline">
                  <Label className="text-md text-stone-700">
                    Enter your password
                  </Label>
                  <Link href="/forgot-password">
                    <p className="text-xs text-stone-700 items-center hover:underline hover:text-amber-800">
                      Forgot your password?
                    </p>
                  </Link>
                </div>
                <Input
                  className="!text-md !text-amber-800 !placeholder-amber-800 "
                  type="password"
                  {...register('password')}
                  placeholder="Your password here"
                />
                {errors.password && (
                  <p className="font-inter text-red-600 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="w-full items-center pt-3 flex flex-col">
                <Button
                  className="w-full bg-paleGold hover:bg-mutedTaupe text-amber-800 hover:text-champagneGold font-bold text-lg font-inter"
                  type="submit"
                >
                  {isSubmitting ? <Spinner /> : 'Sign In'}
                </Button>
                <span className="font-inter text-red-600 text-sm pt-2">
                  {statusMessage}
                </span>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-3 items-center font-inter">
          <p className="text-lg text-stone-700">
            Don't have an account?{' '}
            <Link href="/registerPage">
              <span className="text-amber-800 font-bold hover:underline">
                Sign Up Now!
              </span>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
