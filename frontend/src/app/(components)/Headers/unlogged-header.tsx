'use client'

import Link from 'next/link'
import { useContextWrap } from '@/contextAPI/context'
import Image from 'next/image'
import { Menu, ShieldQuestionIcon, LogIn, UserPlus } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

export default function UnLoggedHeader() {
  const { setStatusMessage } = useContextWrap()
  return (
    <>
      <div className="flex flex-row py-5 bg-stone-100 font-poppins max-h-[85px] text-center items-center w-full">
        <nav className=" flex items-center justify-between lg:justify-between flex-row w-full px-5 sm:text-xl">
          <div className="flex flex-row items-center lg:gap-20 lg:px-20">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-100 lg:h-100 mt-1">
              <Link href="/">
                <Image
                  src="/reworked-logo.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </Link>
            </div>
          </div>
          <div className="flex flex-row items-center gap-5 lg:gap-20 text-center lg:px-20">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Menu className="text-amber-800" size={36} />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="font-medium text-amber-800 px-3 bg-white"
              >
                <DropdownMenuLabel className="text-xl font-bold font-poppins">
                  Options
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-amber-800 -mx-3" />
                <Link href="/">
                  <DropdownMenuItem>
                    <button
                      className="flex flex-row gap-2 items-center"
                      type="button"
                      onClick={() => {
                        setStatusMessage('')
                      }}
                    >
                      <LogIn size={24} />
                      <span className="text-lg font-poppins">Sign In</span>
                    </button>
                  </DropdownMenuItem>
                </Link>
                <Link href="/registerPage">
                  <DropdownMenuItem>
                    <button
                      className="flex flex-row gap-2 items-center"
                      type="button"
                      onClick={() => {
                        setStatusMessage('')
                      }}
                    >
                      <UserPlus size={24} />
                      <span className="text-lg font-poppins">Sign Up</span>
                    </button>
                  </DropdownMenuItem>
                </Link>
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
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      </div>
      <hr className="mb-5 border-2 border-amber-800" />
    </>
  )
}
