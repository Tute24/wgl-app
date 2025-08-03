'use client'

import useSubmitRegister from '@/app/registerPage/(hooks)/useSubmitRegister'
import { useContextWrap } from '@/contextAPI/context'
import usersDataSchema from '@/zodSchemas/usersDataSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Spinner } from '@/app/(components)/Common/spinner/spinner'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/(components)/ui/card'
import { Input } from '@/app/(components)/ui/input'
import { Label } from '@/app/(components)/ui/label'
import { Button } from '@/app/(components)/ui/button'

type usersData = z.infer<typeof usersDataSchema>

export default function RegisterForm() {
  const { statusMessage } = useContextWrap()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<usersData>({
    resolver: zodResolver(usersDataSchema),
  })
  const submitRegister = useSubmitRegister()
  const onSubmit: SubmitHandler<usersData> = submitRegister

  return (
    <div className="flex flex-col items-center justify-center m-auto h-screen px-4">
      <Card className="border-amber-800 hover:shadow-md hover:shadow-amber-800">
        <CardHeader>
          <CardTitle className="!text-amber-800 text-bold text-xl font-inter text-center">
            Create your account below
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col items-start gap-3 font-inter w-full">
              <div className="flex flex-row gap-5 items-center">
                <div className="flex flex-col gap-2 items-start justify-start w-full">
                  <Label className="text-md text-stone-700">First name</Label>
                  <Input
                    className="!text-md !text-amber-800 !placeholder-amber-800"
                    type="text"
                    {...register('firstName')}
                    placeholder="Your first name here"
                  />
                  {errors.firstName && (
                    <p className="font-inter text-red-600 text-sm">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-2 items-start justify-start w-full">
                  <Label className="text-md text-stone-700">Last name</Label>
                  <Input
                    className="!text-md !text-amber-800 !placeholder-amber-800"
                    type="text"
                    {...register('lastName')}
                    placeholder="Your last name here"
                  />
                  {errors.lastName && (
                    <p className="font-inter text-red-600 text-sm">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2 items-start justify-start w-full">
                <Label className="text-md text-stone-700">E-mail</Label>
                <Input
                  className="!text-md !text-amber-800 !placeholder-amber-800"
                  type="text"
                  {...register('email')}
                  placeholder="Enter a valid e-mail address"
                />
                {errors.email && (
                  <p className="font-inter text-red-600 text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 items-start justify-start w-full">
                <Label className="text-md text-stone-700">Password</Label>
                <Input
                  className="!text-md !text-amber-800 !placeholder-amber-800"
                  type="password"
                  {...register('password')}
                  placeholder="Enter your password"
                />
                {errors.password && (
                  <p className="font-inter text-red-600 text-sm max-w-[400px]">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2 items-start justify-start w-full">
                <Label className="text-md text-stone-700">
                  Confirm your password
                </Label>
                <Input
                  className="!text-md !text-amber-800 !placeholder-amber-800"
                  type="password"
                  {...register('confirmPassword')}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <p className="font-inter text-red-600 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <div className="w-full items-center pt-3 flex flex-col">
                <Button
                  className="w-full bg-paleGold hover:bg-mutedTaupe text-amber-800 hover:text-champagneGold font-bold text-lg font-inter"
                  type="submit"
                >
                  {isSubmitting ? <Spinner /> : 'Sign Up'}
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
            Already have an account?{' '}
            <Link href="/">
              <span className="text-amber-800 font-bold hover:underline">
                Sign In Now!
              </span>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
