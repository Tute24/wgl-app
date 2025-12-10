import SignInForm from '@/components/Forms/sign-in-form';
import UnLoggedHeader from '@/components/Headers/unlogged-header';

export default function signIn() {
  return (
    <>
      <UnLoggedHeader />
      <SignInForm />
    </>
  );
}
