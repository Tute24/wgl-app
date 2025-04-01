import Link from 'next/link'
import UserButton from '../Common/buttons/user-button/user-button'

export default function UnLoggedHeader() {
  return (
    <>
      <div className="py-4">
        <nav className=" flex items-center justify-evenly flex-row">
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
          <div className="flex flex-row gap-4">
            <Link href="/registerPage">
            <UserButton className="w-[125px] " content="Sign Up" />
            </Link>
            <Link href="/">
              <UserButton className="w-[125px] bg-paleGold hover:bg-warmBeige" content="Sign In" />
            </Link>
            <div className="flex flex-row gap-3 items-center"></div>
          </div>
        </nav>
        <hr className="mt-5 border-2 border-gray-100" />
      </div>
    </>
  )
}
