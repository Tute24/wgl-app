import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BsEmojiFrown } from 'react-icons/bs';

export default function NotFoundPageWarning() {
  return (
    <div>
      <div className="flex text-sm sm:text-base flex-col  justify-center items-center m-auto text-amber-800 p-3 font-poppins">
        <div className="flex flex-row items-center text-center gap-1 sm:gap-5">
          <BsEmojiFrown size={55} />
          <h1 className="font-bold text-center">
            404 - Oops! The page you are looking for does not exist or has been moved.
          </h1>
        </div>
        <h2 className="pt-3 flex text-center">
          You might have mystiped the address, or the page may no longer be available.
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
