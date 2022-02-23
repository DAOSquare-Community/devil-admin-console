import { FC } from 'react'
import Image from 'next/image'
import { logoAddress } from 'lib/config'

export type NavBarProps = { title?: string }

const NavBar: FC<NavBarProps> = ({}) => {
  return (
    <div
      className="
    sticky top-0 z-30 flex h-16 w-full justify-center bg-gray-100 bg-opacity-90 text-base-content backdrop-blur 
    transition-all duration-100 
    "
    >
      <nav className="navbar w-full">
        <label
          htmlFor="drawer"
          className="btn btn-ghost drawer-button btn-square lg:hidden "
        >
          <svg
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5  stroke-current text-black md:h-6 md:w-6 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href="/"
            aria-current="page"
            aria-label="Homepage"
            className="flex-0 btn btn-ghost px-2 "
          >
            <div className="font-title inline-flex text-lg text-primary transition-all duration-200 md:text-3xl">
              <Image width={60} height={20} src={logoAddress} alt="logo" />
            </div>
          </a>
        </div>
      </nav>
    </div>
  )
}

export default NavBar
