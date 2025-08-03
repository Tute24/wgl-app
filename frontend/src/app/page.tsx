import SignInForm from './(components)/Forms/sign-in-form'
import UnLoggedHeader from './(components)/headers/unlogged-header'

export default function signIn() {
  return (
    <>
      <UnLoggedHeader />
      <SignInForm />
    </>
  )
}
