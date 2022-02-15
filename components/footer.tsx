import Image from 'next/image'
import { AriaAttributes, FC } from 'react'
import Link from 'next/link'

const FooterItem: FC<AriaAttributes> = ({ children, ...props }) => {
  return (
    <a
      href="#"
      className="mx-2 text-gray-600 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-300"
      {...props}
    >
      {children}
    </a>
  )
}

const Footer: FC = () => {
  return (
    <footer className="flex flex-col items-center justify-between bg-white px-6 py-4 dark:bg-gray-800 sm:flex-row">
      <Link href="#">
        <a className="text-xl font-bold text-gray-800 hover:text-gray-700 dark:text-white dark:hover:text-gray-300" />
      </Link>
      <p className="py-2 text-gray-800 dark:text-white sm:py-0">
        All rights reserved
      </p>

      <div className="-mx-2 flex">
        <FooterItem aria-label="Facebook">
          <i className="fa-brands fa-facebook" style={{ height: 15 }} />
        </FooterItem>

        <FooterItem aria-label="Github">
          <i className="fa-brands fa-github" style={{ height: 15 }} />
        </FooterItem>
      </div>
    </footer>
  )
}

export default Footer
