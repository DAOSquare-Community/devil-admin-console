const logoAddress = 'https://iph.href.lu/80x15?text=logo&fg=000000&bg=ffffff'

import memoryCache, { CacheClass } from 'memory-cache'
import { User } from 'models/User'
import { MenuName } from 'types/page'
import { Role, RoleApiPermission } from 'types/permission'

export enum SessionStorageKeys {
  DEEP_URL_KEY = 'DEEP_URL_KEY',
}

export const DontSignPathList = ['/login', '/404', '/401']

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

/**
 * the User Cache
 *
 * key: wallet_address
 * value: <User>
 */
//export const UserCache: CacheClass<string, User> = new memoryCache.Cache()

/**
 * the user's nonce for matemask sign in
 *
 * key: wallet_address
 * value: nonce
 */
export const UserNonceCache: CacheClass<string, string> =
  new memoryCache.Cache()

/**
 * the role's api permission
 */
export const RoleApis: RoleApiPermission[] = [
  {
    apiRouter: '/api/v2/user',
    role: ['super-admin', 'admin'],
    method: ['GET', 'POST', 'DELETE', 'PUT'],
  },
  {
    apiRouter: '/api/v2/user',
    role: ['member'],
    method: ['GET'],
  },
  {
    apiRouter: '/api/v2/sign-in',
    role: ['super-admin', 'admin', 'member'],
    method: ['POST'],
  },
]

export { logoAddress }
