

import Link from 'next/link'

export default function UnLoggedHeader() {
  return (
    <>
      <div className="py-4">
        <nav className=" flex flex-col justify-center items-center text-xs sm:justify-evenly sm:flex-row w-full sm:text-base">
          <div className="flex items-center">
            <Link href="/">
              <button type="button" className="px-5">
                <img
                  className="h-10 w-10 p-0 "
                  src="/product-hunt.png"
                  alt="logo"
                />
              </button>
            </Link>
          </div>
          <div className="font-semibold">
            <button type="button" className="p-2 hover:text-orange1">
              About
            </button>
          </div>
          <div className="">
            <Link href="/registerPage">
              <button className=" font-semibold border-solid border-gray-200 border-2 rounded-3xl px-5 py-2 mr-5 hover:bg-gray-200">
                Register
              </button>
            </Link>
            <Link href="/">
              <button className="px-5 py-2 bg-black text-white font-bold rounded-3xl hover:bg-black">
                Log In
              </button>
            </Link>
            <div className="flex flex-row gap-3 items-center"></div>
          </div>
        </nav>
        <hr className="mt-5 border-2 border-gray-100" />
      </div>
    </>
  )
}
