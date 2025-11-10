'use client'

import useLogOut from '@/app/(auxiliary-functions)/hooks/useSignOut'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/(components)/ui/dropdown-menu'
import {
  Menu,
  LogOut,
  Hourglass,
  ListPlus,
  LayoutDashboard,
  ShieldQuestionIcon,
} from 'lucide-react'
import Image from 'next/image'
import { useGeneralStore } from '@/stores/general/general.provider'
import { useShallow } from 'zustand/shallow'
import { useGetPendingRequests } from '@/app/(auxiliary-functions)/hooks/useGetPendingRequests'
import { useEffect } from 'react'

export default function LoggedHeader() {
  const getPendingRequests = useGetPendingRequests()
  useEffect(() => {
    getPendingRequests()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const logOut = useLogOut()
  const { username, pendingRequests } = useGeneralStore(
    useShallow((store) => ({
      username: store.username,
      pendingRequests: store.pendingRequests,
    })),
  )
  return (
    <>
      <div className="py-5 bg-stone-100 font-poppins">
        <nav className=" flex text-sm items-center justify-evenly flex-row w-full sm:text-xl">
          <div className="-mt-5 -mb-8 lg:-mt-10 lg:-mb-10">
            <Link href="/portal/dashboard" data-testid="logged-header-logo">
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
              <button type="button" className="p-2">
                Weddings Dashboard
              </button>
            </Link>
          </div>
          <div className="text-amber-800 hover:text-amber-900 font-bold hidden lg:block">
            <Link href="/portal/createList">
              <button type="button" className="p-2">
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
                <div className="relative" data-testid="logged-menu-trigger">
                  <Menu className="text-amber-800" size={28} />
                  {pendingRequests > 0 && (
                    <span className="absolute -top-0 -right-0 w-3.5 h-3.5 bg-red-600 rounded-full border-2 border-white "></span>
                  )}
                </div>
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
                    >
                      <ListPlus size={24} />
                      <span className="text-lg font-poppins">
                        Create new wedding
                      </span>
                    </button>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem>
                  <div className="relative">
                    <Link href="/portal/requests-history">
                      <button
                        className="flex flex-row gap-2 items-center"
                        type="button"
                      >
                        <Hourglass size={24} />
                        <span className="text-lg font-poppins">
                          Requests List
                        </span>
                        {pendingRequests > 0 && (
                          <span className="absolute -top-1 -right-2 w-3.5 h-3.5 bg-red-600 rounded-full border-2 border-white "></span>
                        )}
                      </button>
                    </Link>
                  </div>
                </DropdownMenuItem>
                <Link href="/portal/about-page">
                  <DropdownMenuItem>
                    <button
                      className="flex flex-row gap-2 items-center"
                      type="button"
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
