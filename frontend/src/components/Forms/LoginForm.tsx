import { ChangeEvent, FormEvent } from 'react'
import Link from 'next/link'
import InputContainer from '../Common/input-container/input-container'
import SubmitButton from '../Common/submit-button/submit-button'
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
  statusMessage,
}: LoginFormProps) {
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex justify-center items-center">
        <div className="flex items-center w-full"></div>
        <form onSubmit={onSubmit}>
          <InputContainer
            id="email"
            type="email"
            label="E-mail"
            name="email"
            value={usersSign.email}
            onChange={onChange}
            placeholder="Sign in with your e-mail"
          />
          <InputContainer
            id="password"
            type="password"
            label="Password"
            name="password"
            value={usersSign.password}
            onChange={onChange}
            placeholder="Type your password"
          />
          <div className="py-4">
            <SubmitButton id="submitButton" title="Sign in" />
            <span className="text-red-500 font-bold">{statusMessage}</span>
          </div>
        </form>
      </div>
      <div className="text-center">
        <span className="font-semibold text-mutedTaupe">
          Are you a new user?
          <Link href="/registerPage">
            <span className="text-amber-800 underline">Sign up now!</span>
          </Link>
        </span>
      </div>
    </div>
  )
}
