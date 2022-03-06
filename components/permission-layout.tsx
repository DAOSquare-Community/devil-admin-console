import { DefaultRoloPermissions, HomeRoute, RoutePermissions } from 'lib/config'
import { useCustomLayoutEffect } from 'lib/utils/hooks'
import { usePermissionCheck } from 'lib/utils/permission'
import { useRouter } from 'next/router'
import { FC } from 'react'

const PermissionLayout: FC<{
  pathname: string
}> = ({ children, pathname }) => {
  const routePermission =
    RoutePermissions.get(pathname) ?? DefaultRoloPermissions
  const allowed = usePermissionCheck(routePermission)

  const router = useRouter()
  useCustomLayoutEffect(() => {
    if (!allowed && pathname !== HomeRoute) {
      router.replace(HomeRoute)
    }
  }, [allowed, router])

  if (allowed) {
    return <>{children}</>
  }
  return null
}

export default PermissionLayout
