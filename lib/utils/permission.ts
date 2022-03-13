import { DefaultRoloPermissions } from 'lib/config'
import MeContext from 'lib/me-provider'
import { useContext } from 'react'
import { Role } from 'types/permission'

export const permissionCheck = (
  roles = DefaultRoloPermissions,
  current?: Set<Role>
) => {
  return !!new Set([...roles].filter((x) => current?.has(x))).size
}

export const usePermissionCheck = (current?: Role[]) => {
  const { state } = useContext(MeContext)
  const { roles } = state

  return permissionCheck(new Set(roles), new Set(current))
}
