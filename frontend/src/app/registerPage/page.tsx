'use client'

import RegisterForm from './(components)/RegistrationForms/RegistrationForm'
import UnLoggedHeader from '../../components/Headers/UnLoggedHeader'
import { useContextWrap } from '../../contextAPI/context'

export default function Register() {
  const { statusMessage } = useContextWrap()

  return (
    <>
      <UnLoggedHeader />
      <RegisterForm statusMessage={statusMessage} />
    </>
  )
}
