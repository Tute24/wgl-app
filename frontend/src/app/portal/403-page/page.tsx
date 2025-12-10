import { Button } from '@/app/(components)/ui/button';
import Link from 'next/link';
import { BsSignStop } from 'react-icons/bs';

export default function NotPermittedPageWarning() {
  return (
    <div>
      <div className="flex text-sm sm:text-base flex-col  justify-center items-center m-auto text-amber-800 p-3 font-poppins">
        <div className="flex flex-row items-center text-center gap-1 sm:gap-5">
          <BsSignStop size={55} />
          <h1 className="font-bold text-center">
            403 - You are not allowed to access the content of this page.
          </h1>
        </div>
        <h2 className="pt-3 flex text-center">
          You might have mystiped the address, or you do not have permission.
        </h2>
        <div className="pt-3">
          <Link href="/portal/dashboard">
            <Button className="font-semibold">Go back to the dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
