import MeContext from 'lib/me-provider'
import { useContext } from 'react'
import { Role } from 'types/permission'

export const permissionCheck = (roles: Set<Role>, current: Set<Role>) =>
  !!new Set([...roles].filter((x) => current.has(x))).size

export const usePermissionCheck = (current: Set<Role>) => {
  const { state } = useContext(MeContext)
  const { roles = ['super-admin'] } = state
  return permissionCheck(new Set(roles), current)
}
