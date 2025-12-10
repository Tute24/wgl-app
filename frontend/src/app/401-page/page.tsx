import Link from 'next/link';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import UnLoggedHeader from '../(components)/headers/unlogged-header';

export default function NotPermittedPageWarning() {
  return (
    <div>
      <UnLoggedHeader />
      <div className="flex text-sm sm:text-base flex-col  justify-center items-center m-auto h-auto text-amber-800 p-3 font-poppins">
        <div className="flex flex-row items-center text-center gap-1 sm:gap-5">
          <IoMdCloseCircleOutline size={65} />
          <h1 className="font-bold text-center">
            401 - You must be signed in to access the content of this content.
          </h1>
        </div>
        <h2 className="pt-3 text-center">
          <Link className="underline font-bold" href="/">
            Sign in
          </Link>{' '}
          or{' '}
          <Link className="underline font-bold" href="/registerPage">
            create an account
          </Link>{' '}
          to access this page.
        </h2>
      </div>
    </div>
  );
}
