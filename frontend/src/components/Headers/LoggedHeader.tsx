'use client'

import { useContextWrap } from '@/contextAPI/context'
import checkAuth from '@/functions/checkAuthFunction'
import useLogOut from '@/functions/logOutFunction'
import Link from 'next/link'
import UserButton from '../Common/buttons/user-button/user-button'

export default function LoggedHeader() {
  checkAuth()
  const { setNotGuest } = useContextWrap()
  const logOut = useLogOut()
  return (
    <>
      <div className="py-5 bg-softWhite">
        <nav className=" flex text-sm items-center justify-evenly flex-row w-full sm:text-base">
          <div className="text-amber-800 hover:text-amber-900 font-bold">
            <Link href="aboutPage">
              <button type="button" className="p-2">
                About
              </button>
            </Link>
          </div>
          <div className="text-amber-800 hover:text-amber-900 font-bold">
            <Link href="/dashboard">
              <button
                onClick={() => {
                  setNotGuest(false)
                }}
                type="button"
                className="p-2"
              >
                My lists
              </button>
            </Link>
          </div>
          <div className="text-amber-800 hover:text-amber-900 font-bold">
            <Link href="/createList">
              <button type="button" className="p-2">
                New wedding gift list
              </button>
            </Link>
          </div>
          <div>
            <Link href="/">
              <UserButton
                className="!w-[80px] sm:!w-[150px]"
                content="Log Out"
                onClick={logOut}
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
