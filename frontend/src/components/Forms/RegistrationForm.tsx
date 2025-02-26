import usersDataSchema from '@/zodSchemas/usersDataSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, SetStateAction } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'


type usersData = z.infer<typeof usersDataSchema>

interface RegisterFormsProps {
  // usersData: {
  //   firstName: string
  //   lastName: string
  //   email: string
  //   password: string
  //   confirmPassword: string
  // }
  // onChange: (event: ChangeEvent<HTMLInputElement>) => void
  // onSubmit: (event: FormEvent) => void
  statusMessage: string,
  setStatusMessage: React.Dispatch<SetStateAction<string>>
}

export default function RegisterForm({
  statusMessage,
  setStatusMessage
}: RegisterFormsProps) {

  const router = useRouter()
  const {register, handleSubmit} = useForm<usersData>({
    resolver: zodResolver(usersDataSchema)
  })

  const onSubmit: SubmitHandler<usersData> = async (data) => {
    
    if (data.password !== data.confirmPassword) {
      setStatusMessage('Passwords must be the same!')
    } else{

    try{
      const response = await axios.post(
        'http://localhost:3000/createUser',
        data
      )
    
      if (response.status === 200) {
        const userToken = response.data.token
        localStorage.setItem('userToken',JSON.stringify(userToken))
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
                // value={usersData.firstName}
                // onChange={onChange}
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
                // value={usersData.lastName}
                // onChange={onChange}
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
                // name="email"
                // value={usersData.email}
                // onChange={onChange}
                {...register('email')}
                required
              />
            </div>
            <div className="p-2">
              <label htmlFor="newPassword">Type your password:</label>
              <input
                className="mt-1 border-solid border-2 border-amber-100 bg-amber-50 rounded-2xl text-center text-black text-sm w-full focus:outline-none ring-2 ring-amber-200 "
                id="password"
                // name="password"
                type="password"
                // value={usersData.password}
                // onChange={onChange}
                {...register('password')}
                required
              />
            </div>
            <div className="p-2">
              <label htmlFor="newPasswordauth">Confirm your password:</label>
              <input
                className="mt-1 border-solid border-2 border-amber-100 bg-amber-50 rounded-2xl text-center text-black text-sm w-full focus:outline-none ring-2 ring-amber-200 "
                type="password"
                // name="confirmPassword"
                // value={usersData.confirmPassword}
                // onChange={onChange}
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
              <span className='text-red-500 font-bold'>{statusMessage}</span>
            </div>
            
          </form>

        </div>
      </div>
    </>
  )
}
