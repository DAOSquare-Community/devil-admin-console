import Link from 'next/link'
import { FC, ReactElement, SVGProps } from 'react'
import Image from 'next/image'
import UserInfo from './user-info'
import { PageName } from 'types/page'
import { Role } from 'types/permission'
import { useRouter } from 'next/router'
import { logoAddress } from 'lib/config'
import { FiHome, FiUser } from 'react-icons/fi'
import { AiOutlineSetting } from 'react-icons/ai'

const defaultRoloPermissions: Role[] = ['admin', 'dev']

const MenuConfigMap: Map<
  PageName,
  {
    name?: string
    role: Role[]
    Icon: (props: SVGProps<SVGSVGElement>) => ReactElement<unknown, string>
  }
> = new Map([
  ['dashboard', { Icon: FiHome, role: defaultRoloPermissions }],
  ['accounts', { Icon: FiUser, role: ['admin'] }],
  ['settings', { Icon: AiOutlineSetting, role: defaultRoloPermissions }],
])

const Menu: FC = () => {
  const router = useRouter()
  const currentPath = router.pathname.split('/')[1]

  return (
    <div className="mt-6 flex flex-1 flex-col justify-between ">
      <nav>
        {[...MenuConfigMap.entries()].map(([key, { name, Icon }]) => (
          <Link href={`/${key}`} key={key}>
            <a
              className={`mt-5 flex items-center px-4 py-2  ${
                key === currentPath
                  ? `bg-gray-200   text-gray-700 dark:bg-gray-700 dark:text-gray-200`
                  : `text-gray-600 transition-colors duration-200  hover:bg-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200`
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-transform: mx-4 capitalize">
                {key ?? name}
              </span>
            </a>
          </Link>
        ))}
      </nav>
    </div>
  )
}

const SlideMenu = () => {
  return (
    <div className="flex h-full w-64 flex-col border-r bg-white  py-8 dark:border-gray-600 dark:bg-gray-800">
      <Image
        width={60}
        height={30}
        priority
        className="mx-auto h-12 w-auto"
        src={logoAddress}
        alt="logo"
      />
      <UserInfo />
      <Menu />
    </div>
  )
}

export default SlideMenu
