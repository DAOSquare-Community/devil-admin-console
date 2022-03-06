const logoAddress = 'https://iph.href.lu/80x15?text=logo&fg=000000&bg=ffffff'

import { MenuName } from 'types/page'
import { Role } from 'types/permission'

export enum SessionStorageKeys {
  DEEP_URL_KEY = 'DEEP_URL_KEY',
}

export const DontSignPathList = ['/sign-in']

export const HomeRoute = '/dashboard'

export const MenuConfigMap: Map<MenuName, { name?: string; icon: string }> =
  new Map([
    ['dashboard', { icon: 'fa-gauge-high' }],
    ['daos', { icon: 'fa-user' }],
    ['accounts', { icon: 'fa-user' }],
  ])

export const DefaultRoloPermissions: Set<Role> = new Set([
  'admin',
  'member',
  'super-admin',
])

export const RoutePermissions: Map<string, Set<Role>> = new Map([
  ['/accounts', new Set(['super-admin'])],
  ['/daos', new Set(['super-admin', 'admin'])],
])

export { logoAddress }
