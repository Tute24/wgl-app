import { useContextWrap } from '@/contextAPI/context'
import { ChangeEvent, FormEvent } from 'react'

interface RegisterFormsProps {
  usersData: {
    firstName: string
    lastName: string
    email: string
    password: string
    confirmPassword: string
  }
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onSubmit: (event: FormEvent) => void
}

export default function RegisterForm({
  usersData,
  onChange,
  onSubmit,
}: RegisterFormsProps) {

    const {statusMessage,setStatusMessage} = useContextWrap()

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen bg-emerald-50">
        <div className="font-sans p-10 text-center bg-black text-white font-semibold rounded-2xl">
          <div className="flex justify-center items-center -mt-5 mb-3">
            <h2>Register yourself</h2>
          </div>
          <form onSubmit={onSubmit} className="flex flex-col ">
            <div className="p-2">
              <label htmlFor="firstName">Your first name:</label>
              <input
                className="mt-1 border-solid border-2 border-amber-100 bg-amber-50 rounded-2xl text-center
                 text-black text-sm w-full focus:outline-none ring-2 ring-amber-200 "
                type="text"
                id="firstName"
                value={usersData.firstName}
                onChange={onChange}
                name="firstName"
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
                name="lastName"
                value={usersData.lastName}
                onChange={onChange}
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
                name="email"
                value={usersData.email}
                onChange={onChange}
                required
              />
            </div>
            <div className="p-2">
              <label htmlFor="newPassword">Type your password:</label>
              <input
                className="mt-1 border-solid border-2 border-amber-100 bg-amber-50 rounded-2xl text-center text-black text-sm w-full focus:outline-none ring-2 ring-amber-200 "
                id="password"
                name="password"
                type="password"
                value={usersData.password}
                onChange={onChange}
                required
              />
            </div>
            <div className="p-2">
              <label htmlFor="newPasswordauth">Confirm your password:</label>
              <input
                className="mt-1 border-solid border-2 border-amber-100 bg-amber-50 rounded-2xl text-center text-black text-sm w-full focus:outline-none ring-2 ring-amber-200 "
                type="password"
                name="confirmPassword"
                value={usersData.confirmPassword}
                onChange={onChange}
                required
              />
            </div>
            <div className="p-5">
              <button
                className="bg-amber-50 rounded-full py-0.5 px-4 text-black font-bold border-amber-100 border-solid border-2 w-full mt-2.5 hover:bg-amber-200 focus:outline-none ring-2 ring-amber-200"
                type="submit"
                id="registerButton"
              >
                Sign Up!
              </button>
            </div>
            <span className='text-white'>{statusMessage}</span>
          </form>

        </div>
      </div>
    </>
  )
}
