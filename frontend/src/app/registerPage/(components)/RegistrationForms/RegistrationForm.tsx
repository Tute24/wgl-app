import useSubmitRegister from '@/app/registerPage/(hooks)/useSubmitRegister'
import usersDataSchema from '@/zodSchemas/usersDataSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

type usersData = z.infer<typeof usersDataSchema>

interface RegisterFormsProps {
  statusMessage: string
}

export default function RegisterForm({ statusMessage }: RegisterFormsProps) {
  const { register, handleSubmit, formState:{errors} } = useForm<usersData>({
    resolver: zodResolver(usersDataSchema),
  })
  const submitRegister = useSubmitRegister()
  const onSubmit: SubmitHandler<usersData> = submitRegister

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen bg-emerald-50">
        <div className="font-sans p-10 text-center bg-black text-white font-semibold rounded-2xl">
          <div className="flex justify-center items-center -mt-5 mb-3">
            <h2>Register yourself</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">
            <div className="p-2">
              <label htmlFor="firstName">Your first name:</label>
              <input
                className="mt-1 border-solid border-2 border-amber-100 bg-amber-50 rounded-2xl text-center
                 text-black text-sm w-full focus:outline-none ring-2 ring-amber-200 "
                type="text"
                id="firstName"
                {...register('firstName')}
                required
              />
            </div>
          
            <div className="p-2">
              <label htmlFor="lastName">Your Last Name</label>
              <input
                className="mt-1 border-solid border-2 border-amber-100 bg-amber-50 rounded-2xl text-center
                 text-black text-sm w-full focus:outline-none ring-2 ring-amber-200 "
                type="text"
                id="lastName"
                {...register('lastName')}
                required
              />
            </div>
            <div className="p-2">
              <label htmlFor="newEmail">Type a valid e-mail address:</label>
              <input
                className="mt-1 border-solid border-2 border-amber-100 bg-amber-50 rounded-2xl 
                text-center text-black text-sm w-full focus:outline-none ring-2 ring-amber-200 "
                type="email"
                id="email"
                {...register('email')}
                required
              />
              {errors.email && <span className='text-red-500 font-bold'>{errors.email.message}</span>}
            </div>
            
            <div className="p-2">
              <label htmlFor="newPassword">Type your password:</label>
              <input
                className="mt-1 border-solid border-2 border-amber-100 bg-amber-50 rounded-2xl text-center text-black text-sm w-full focus:outline-none ring-2 ring-amber-200 "
                id="password"
                type="password"
                {...register('password')}
                required
              />
              {errors.password && <span className='text-red-500 font-bold'>{errors.password.message}</span>}
            </div>
            <div className="p-2">
              <label htmlFor="newPasswordauth">Confirm your password:</label>
              <input
                className="mt-1 border-solid border-2 border-amber-100 bg-amber-50 rounded-2xl text-center text-black text-sm w-full focus:outline-none ring-2 ring-amber-200 "
                type="password"
                {...register('confirmPassword')}
                required
              />
            </div>
            <div className="p-5 flex flex-col justify-center">
              <button
                className="bg-amber-50 rounded-full py-0.5 px-4 text-black font-bold border-amber-100 border-solid border-2 w-full mt-2.5 hover:bg-amber-200 focus:outline-none ring-2 ring-amber-200"
                type="submit"
                id="registerButton"
              >
                Sign Up!
              </button>
              <span className="text-red-500 font-bold">{statusMessage}</span>
              
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
