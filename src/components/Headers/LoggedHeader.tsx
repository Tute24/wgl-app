import Link from 'next/link'

export default function LoggedHeader() {
  return (
    <>
      <div className="py-4">
        <nav className=" flex flex-col justify-center items-center text-xs sm:justify-evenly sm:flex-row w-full sm:text-base">
          <div className="flex items-center">
            <Link href="/dashboard">
              <button type="button" className="px-5">
                <img className="h-10 w-10 p-0 " src="/vercel.svg" alt="logo" />
              </button>
            </Link>
          </div>
          <div className="font-semibold">
            <Link href="aboutPage">
              <button type="button" className="p-2 hover:text-orange1">
                About
              </button>
            </Link>
          </div>
          <div className="font-semibold">
            <Link href="/dashboard">
              <button type="button" className="p-2 hover:text-orange1">
                My lists
              </button>
            </Link>
          </div>
          <div className="font-semibold">
            <Link href="/createList">
              <button type="button" className="p-2 hover:text-orange1">
                New wedding gift list
              </button>
            </Link>
          </div>
          <div className="">
            <Link href="/">
              <button className=" font-semibold border-solid border-gray-200 border-2 rounded-3xl px-5 py-2 mr-5 hover:bg-gray-200">
                Logout
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
