import { ChangeEvent, FormEvent } from 'react'
import Link from 'next/link'
import InputContainer from '../Common/input-container/input-container'
interface LoginFormProps {
  usersSign: {
    email: string
    password: string
  }
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onSubmit: (event: FormEvent) => void
  statusMessage: string
}

export default function LoginForm({
  usersSign,
  onChange,
  onSubmit,
  statusMessage
}: LoginFormProps) {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="font-sans p-10 text-center  text-black font-semibold rounded-sm">
        <div className="flex justify-between items-center -mt-5 mb-3"></div>
        <form onSubmit={onSubmit}>
          <InputContainer
          id='email'
          type='email'
          label='E-mail'
          name='email'
          value={usersSign.email}
          onChange={onChange}
          placeholder='Log in with your e-mail'
          />
          <InputContainer
          id='password'
          type='password'
          label='Password'
          name='password'
          value={usersSign.password}
          onChange={onChange}
          placeholder='Type your password'
          />
          <div className="p-5 ">
            <button
              className="bg-amber-50 rounded-full py-0.5 px-4 text-black font-bold border-amber-100 border-solid border-2 w-full mt-2.5 hover:bg-amber-200 focus:outline-none ring-2 ring-amber-200"
              type="submit"
              id="loginButton"
            >
              Log In
            </button>
            <span className='text-red-500 font-bold'>{statusMessage}</span>
          </div>
        </form>
      </div>
      <div className="text-center">
        <span className="font-semibold">
          Are you a new user? <Link href="/registerPage">Register now!</Link>
        </span>
      </div>
    </div>
  )
}
