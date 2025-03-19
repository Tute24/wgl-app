import { ChangeEvent, FormEvent } from 'react'
import Link from 'next/link'
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
          <div className="p-2">
            <label htmlFor="email">Your E-mail: </label>
            <input
              className="border-solid border-2 rounded-sm text-center text-sm w-full "
              type="email"
              id="email"
              name="email"
              value={usersSign.email}
              onChange={onChange}
              placeholder="Log in with your e-mail"
            />
          </div>
          <div className="p-2">
            <label htmlFor="password">Password:</label>
            <input
              className="border-solid border-2 border-amber-100 bg-amber-50 rounded-2xl text-center text-black text-sm w-full focus:outline-none ring-2 ring-amber-200"
              type="password"
              id="password"
              name="password"
              value={usersSign.password}
              onChange={onChange}
              placeholder="Type your password"
            />
          </div>
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
