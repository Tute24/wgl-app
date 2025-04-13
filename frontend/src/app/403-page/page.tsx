import UserButton from '@/components/Common/buttons/user-button/user-button'
import LoggedHeader from '@/components/Headers/LoggedHeader'
import Link from 'next/link'
import { BsSignStop } from "react-icons/bs";

export default function NotPermittedPageWarning() {
  return (
    <div>
      <LoggedHeader />
      <div className="flex text-sm sm:text-base flex-col  justify-center items-center m-auto text-amber-800 p-3">
        <div className='flex flex-row items-center text-center gap-1 sm:gap-5'>
            <BsSignStop size={55}/>
        <h1 className="font-bold text-center">
          403 - You're not allowed to access the content of this page.
        </h1>
        </div>
          <h2 className="pt-3 flex text-center">
            You might have mystiped the address, you don't have permission.
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