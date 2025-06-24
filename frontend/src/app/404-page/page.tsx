import UserButton from '@/components/Common/buttons/user-button/user-button'
import LoggedHeader from '@/components/Headers/logged-header'
import Link from 'next/link'
import { BsEmojiFrown } from 'react-icons/bs'

export default function NotFoundPageWarning() {
  return (
    <div>
      <LoggedHeader />
      <div className="flex text-sm sm:text-base flex-col  justify-center items-center m-auto text-amber-800 p-3">
        <div className="flex flex-row items-center text-center gap-1 sm:gap-5">
          <BsEmojiFrown size={55} />
          <h1 className="font-bold text-center">
            404 - Oops! The page you're looking for doesn't exist or has been
            moved.
          </h1>
        </div>
        <h2 className="pt-3 flex text-center">
          You might have mystiped the address, or the page may no longer be
          available.
        </h2>
        <div className="pt-3">
          <Link href="/dashboard">
            <UserButton
              className="!w-[225px] sm:!w-[275px]"
              content="Go back to the dashboard page."
            />
          </Link>
        </div>
      </div>
    </div>
  )
}
