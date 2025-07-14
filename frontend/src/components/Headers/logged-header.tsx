'use client'

import { useContextWrap } from '@/contextAPI/context'
import useLogOut from '@/functions/useSignOut'
import Link from 'next/link'
import { useStore } from 'zustand'
import { useUsernameStore } from '@/stores/zustand-store'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Menu,
  LogOut,
  Hourglass,
  ListPlus,
  LayoutDashboard,
  ShieldQuestionIcon,
} from 'lucide-react'
import Image from 'next/image'

export default function LoggedHeader() {
  const { setNotGuest, setStatusMessage } = useContextWrap()
  const logOut = useLogOut()
  const username = useStore(useUsernameStore, (state) => state.username)
  return (
    <>
      <div className="py-5 bg-stone-100 font-poppins">
        <nav className=" flex text-sm items-center justify-evenly flex-row w-full sm:text-xl">
          <div className="-mt-5 -mb-8 lg:-mt-10 lg:-mb-10">
            <Link href="/portal/dashboard">
              <Image
                src="/reworked-logo.png"
                alt="Logo"
                width={100}
                height={100}
              />
            </Link>
          </div>
          <div className="text-amber-800 hover:text-amber-900 font-bold hidden lg:block">
            <Link href="/portal/dashboard">
              <button
                onClick={() => {
                  setNotGuest(false)
                  setStatusMessage('')
                }}
                type="button"
                className="p-2"
              >
                Weddings Dashboard
              </button>
            </Link>
          </div>
          <div className="text-amber-800 hover:text-amber-900 font-bold hidden lg:block">
            <Link href="/portal/createList">
              <button
                type="button"
                className="p-2"
                onClick={() => {
                  setStatusMessage('')
                }}
              >
                Create New Wedding
              </button>
            </Link>
          </div>
          <div className="flex flex-row gap-5 items-center">
            <span className="text-stone-500 font-bold underline-offset-0 text-xl">
              Welcome, {username}
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Menu className="text-amber-800" size={28} />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="font-medium text-amber-800 px-3 bg-white"
              >
                <DropdownMenuLabel className="text-xl font-bold font-poppins">
                  Options
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-amber-800 -mx-3" />
                <Link href="/portal/dashboard">
                  <DropdownMenuItem className="lg:hidden">
                    <button
                      className="flex flex-row gap-2 items-center"
                      type="button"
                      onClick={() => {
                        setStatusMessage('')
                      }}
                    >
                      <LayoutDashboard size={24} />
                      <span className="text-lg font-poppins">Dashboard</span>
                    </button>
                  </DropdownMenuItem>
                </Link>
                <Link href="/portal/createList">
                  <DropdownMenuItem className="lg:hidden">
                    <button
                      className="flex flex-row gap-2 items-center"
                      type="button"
                      onClick={() => {
                        setStatusMessage('')
                      }}
                    >
                      <ListPlus size={24} />
                      <span className="text-lg font-poppins">
                        Create new wedding
                      </span>
                    </button>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem>
                  <button
                    className="flex flex-row gap-2 items-center"
                    type="button"
                    onClick={() => {
                      setStatusMessage('')
                    }}
                  >
                    <Hourglass size={24} />
                    <span className="text-lg font-poppins">
                      Pending Requests
                    </span>
                  </button>
                </DropdownMenuItem>
                <Link href="/aboutPage">
                  <DropdownMenuItem>
                    <button
                      className="flex flex-row gap-2 items-center"
                      type="button"
                      onClick={() => {
                        setStatusMessage('')
                      }}
                    >
                      <ShieldQuestionIcon size={24} />
                      <span className="text-lg font-poppins">About Us</span>
                    </button>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem>
                  <button
                    className="flex flex-row gap-2 items-center"
                    type="button"
                    onClick={() => {
                      logOut()
                      setStatusMessage('')
                    }}
                  >
                    <LogOut size={24} />
                    <span className="text-lg font-poppins">Sign Out</span>
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      </div>
      <hr className="mb-5 border-2 border-amber-800" />
    </>
  )
}
