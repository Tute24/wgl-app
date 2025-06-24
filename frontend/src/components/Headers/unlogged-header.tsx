'use client'

import Link from 'next/link'
import { useContextWrap } from '@/contextAPI/context'
import Image from 'next/image'
import { Button } from '../ui/button'
import { ShieldQuestionIcon } from 'lucide-react'

export default function UnLoggedHeader() {
  const { setStatusMessage } = useContextWrap()
  return (
    <>
      <div className="flex flex-row py-5 bg-stone-100 font-poppins max-h-[85px] text-center items-center w-full">
        <nav className=" flex text-sm items-center justify-between gap-10 lg:justify-between flex-row w-full sm:text-xl">
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
            <div className="text-amber-800 hover:text-amber-900 hidden lg:block font-bold">
              <Link href="/aboutPage">About Us</Link>
            </div>
          </div>
          <div className="flex flex-row items-center gap-5 lg:gap-20 text-center lg:px-20">
            <div className="">
              <Link href="/">
                <Button
                  type="button"
                  onClick={() => setStatusMessage('')}
                  className="text-md lg:text-lg font-poppins font-bold text-stone-700 bg-paleGold hover:bg-dustyRose"
                >
                  Sign In
                </Button>
              </Link>
            </div>
            <div>
              <Link href="/registerPage">
                <Button
                  type="button"
                  onClick={() => setStatusMessage('')}
                  className="text-md lg:text-lg font-poppins font-bold text-stone-700 bg-champagneGold hover:bg-paleGold"
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
          <div className="block lg:hidden items-center text-center pr-4 mt-1">
            <Link href="/aboutPage">
              <button
                className="items-center"
                type="button"
                onClick={() => {
                  setStatusMessage('')
                }}
              >
                <ShieldQuestionIcon size={24} className="text-amber-800" />
              </button>
            </Link>
          </div>
        </nav>
      </div>
      <hr className="mb-5 border-2 border-amber-800" />
    </>
  )
}
