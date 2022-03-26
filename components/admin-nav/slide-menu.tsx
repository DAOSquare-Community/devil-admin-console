import Link from 'next/link'
import { FC, useContext } from 'react'
import { useRouter } from 'next/router'
import MeContext from 'lib/me-provider'
import { permissionCheck } from 'lib/utils/permission'
import { HomeRoute, MenuConfigMap, RoleApis } from 'lib/config'

const Menu: FC = () => {
  const router = useRouter()
  const currentPath = router.pathname.split('/')[1]
  const { state } = useContext(MeContext)
  const { roles: iRoles } = state

  return (
    <ul className="menu menu-compact flex flex-col p-0 px-4">
      <nav>
        {[...MenuConfigMap.entries()]
          .filter(([key, { router }]) => {
            return permissionCheck(
              new Set(
                RoleApis.find(
                  (res) => res.apiRouter === (router ?? `/${key}`)
                )?.role
              ),
              new Set(iRoles)
            )
          })
          .map(([key, { name, Icon, router }]) => (
            <li key={key}>
              <Link href={router ?? `/${key}`}>
                <a
                  id={key === currentPath ? 'active-menu' : ''}
                  className={`sveltekit:prefetch flex gap-4  ${
                    key === currentPath ? `active` : ''
                  }`}
                >
                  <Icon size={18} />
                  <span className="flex-1 capitalize">{key ?? name}</span>
                </a>
              </Link>
            </li>
          ))}
      </nav>
    </ul>
  )
}

const SlideMenu = () => {
  return (
    <aside className="w-80 bg-base-200">
      <div className="sticky top-0 z-20  items-center gap-2 bg-base-200 bg-opacity-90 px-4 py-2 backdrop-blur lg:flex">
        <Link href={HomeRoute}>
          <a
            aria-current="page"
            aria-label="Homepage"
            className="flex-0 btn btn-ghost px-2"
          >
            <div className="inline-flex  transition-all duration-200">
              <span className=" text-2xl font-light uppercase 	 ">Dao</span>
              <span className=" text-2xl capitalize  italic text-orange-500 ">
                Suqare
              </span>
            </div>
          </a>
        </Link>
        <a className=" font-mono text-xs text-opacity-50">dev</a>
      </div>
      {/* <UserInfo /> */}
      <div className="h-4" />
      <Menu />
    </aside>
  )
}

export default SlideMenu
