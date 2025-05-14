'use client'

import { useContextWrap } from '@/contextAPI/context'
import checkAuth from '@/functions/useCheckAuth'
import useLogOut from '@/functions/logOutFunction'
import Link from 'next/link'
import UserButton from '../Common/buttons/user-button/user-button'
import { useStore } from 'zustand'
import { useUsernameStore } from '@/stores/zustand-store'

export default function LoggedHeader() {
  checkAuth()
  const { setNotGuest, setStatusMessage } = useContextWrap()
  const logOut = useLogOut()
  const username = useStore(useUsernameStore, (state) => state.username)
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
                  setStatusMessage('')
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
              <button
                type="button"
                className="p-2"
                onClick={() => {
                  setStatusMessage('')
                }}
              >
                New wedding gift list
              </button>
            </Link>
          </div>
          <div className="flex flex-row gap-5 items-center">
            <span className="text-mutedTaupe font-bold underline-offset-0">
              Welcome, {username}
            </span>
            <Link href="/">
              <UserButton
                className="!w-[80px] sm:!w-[150px]"
                content="Log Out"
                onClick={() => {
                  logOut()
                  setStatusMessage('')
                }}
              />
            </Link>
          </div>
        </nav>
      </div>
      <hr className="mb-5 border-2 border-mutedTaupe" />
    </>
  )
}
