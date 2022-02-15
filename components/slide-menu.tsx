import Link from 'next/link'
import { FC } from 'react'
import Image from 'next/image'
import UserInfo from './user-info'
import { PageName } from 'types/page'
import { Role } from 'types/permission'
import { useRouter } from 'next/router'

const defaultRoloPermissions: Role[] = ['admin', 'dev']

const MenuConfigMap: Map<
  PageName,
  { name?: string; role: Role[]; icon: string }
> = new Map([
  ['dashboard', { icon: 'fa-gauge-high', role: defaultRoloPermissions }],
  ['settings', { icon: 'fa-user', role: defaultRoloPermissions }],
  ['accounts', { icon: 'fa-gear', role: ['admin'] }],
])

const Menu: FC = () => {
  const router = useRouter()
  const currentPath = router.pathname.split('/')[1]

  return (
    <div className="mt-6 flex flex-1 flex-col justify-between">
      <nav>
        {Array.from(MenuConfigMap.entries()).map(([key, { name, icon }]) => (
          <Link href={`/${key}`} key={key}>
            <a
              className={`mt-5 flex items-center px-4 py-2  ${
                key === currentPath
                  ? `bg-gray-200   text-gray-700 dark:bg-gray-700 dark:text-gray-200`
                  : `text-gray-600 transition-colors duration-200  hover:bg-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200`
              }`}
            >
              <i className={`fa-light ${icon}`} style={{ height: 20 }} />
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
    <div className="flex h-screen w-64 flex-col border-r bg-white py-8 dark:border-gray-600 dark:bg-gray-800">
      <UserInfo />
      <Menu />
    </div>
  )
}

export default SlideMenu
