'use client'

import Link from 'next/link'
import UserButton from '../Common/buttons/user-button/user-button'
import { useContextWrap } from '@/contextAPI/context'

export default function UnLoggedHeader() {
  const { setStatusMessage } = useContextWrap()
  return (
    <>
      <div className="py-5 bg-softWhite">
        <nav className=" flex items-center justify-between flex-row px-5 text-amber-800 font-bold">
          <div>
            <button type="button" className="p-2 hover:text-amber-900">
              About
            </button>
          </div>
          <div className="flex flex-row gap-4">
            <Link href="/registerPage">
              <UserButton
                className="!w-[150px]"
                content="Sign Up"
                onClick={() => {
                  setStatusMessage('')
                }}
              />
            </Link>
            <Link href="/">
              <UserButton
                className="!w-[150px] bg-paleGold hover:bg-warmBeige"
                content="Sign In"
                onClick={() => {
                  setStatusMessage('')
                }}
              />
            </Link>
            <div className="flex flex-row gap-3 items-center"></div>
          </div>
        </nav>
      </div>
      <hr className="mb-5 border-2 border-mutedTaupe" />
    </>
  )
}
