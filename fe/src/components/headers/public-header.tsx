import { LogIn, Menu, ShieldQuestionIcon, UserPlus } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export default function PublicHeader() {
  return (
    <>
      <div>
        <nav className="flex flex-row items-center justify-between w-full px-5">
          <div>
            <Link data-testid="protected-header-logo" href="/sign-in">
              <Image
                src="/wglapp-logo.svg"
                alt="Logo"
                width={80}
                height={80}
                className="object-contain"
                priority
              />
            </Link>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger data-testid="protected-menu-trigger" className="cursor-pointer">
                <Menu className="text-amber-800" size={36} />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="font-medium text-amber-800 px-3 bg-white font-poppins"
              >
                <DropdownMenuLabel className="text-xl font-bold">Options</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-amber-800 -mx-3" />
                <Link href="/">
                  <DropdownMenuItem>
                    <button
                      className="flex flex-row gap-2 items-center cursor-pointer"
                      type="button"
                    >
                      <LogIn size={24} />
                      <span className="text-lg">Sign In</span>
                    </button>
                  </DropdownMenuItem>
                </Link>
                <Link href="/registerPage">
                  <DropdownMenuItem>
                    <button
                      className="flex flex-row gap-2 items-center cursor-pointer"
                      type="button"
                    >
                      <UserPlus size={24} />
                      <span className="text-lg">Sign Up</span>
                    </button>
                  </DropdownMenuItem>
                </Link>
                <Link href="/about-page">
                  <DropdownMenuItem>
                    <button
                      className="flex flex-row gap-2 items-center cursor-pointer"
                      type="button"
                    >
                      <ShieldQuestionIcon size={24} />
                      <span className="text-lg">About Us</span>
                    </button>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      </div>
    </>
  );
}
