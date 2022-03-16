import { HiHome, HiUserGroup, HiUsers } from 'react-icons/hi'
const logoAddress = 'https://iph.href.lu/80x15?text=logo&fg=000000&bg=ffffff'

import memoryCache, { CacheClass } from 'memory-cache'
import { MenuName } from 'types/page'
import { Role, RoleApiPermission } from 'types/permission'
import { IconType } from 'react-icons'
import { HttpMethod } from 'types/const-enum'

export enum SessionStorageKeys {
  DEEP_URL_KEY = 'DEEP_URL_KEY',
}

export const DontSignPathList = ['/login', '/404', '/401']

export const HomeRoute = '/'

export const MenuConfigMap: Map<
  MenuName,
  { name?: string; Icon: IconType; router?: string }
> = new Map([
  ['dashboard', { Icon: HiHome, router: '/' }],
  ['daos', { Icon: HiUserGroup }],
  ['accounts', { Icon: HiUsers }],
])

export const DefaultRoloPermissions: Set<Role> = new Set([
  'admin',
  'member',
  'super-admin',
])

// export const RoutePermissions: Map<string, Set<Role>> = new Map([
//   ['/accounts', new Set(['super-admin'])],
//   ['/daos', new Set(['super-admin', 'admin'])],
// ])

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

const AllHttpMethod: HttpMethod[] = [
  HttpMethod.GET,
  HttpMethod.POST,
  HttpMethod.DELETE,
  HttpMethod.PUT,
]

/**
 * the role's api permission
 */
export const RoleApis: RoleApiPermission[] = [
  // frontend api
  {
    apiRouter: '/',
    role: ['super-admin', 'admin', 'member'],
    method: AllHttpMethod,
  },
  {
    apiRouter: '/accounts',
    role: ['super-admin'],
    method: AllHttpMethod,
  },
  {
    apiRouter: '/accounts/add',
    role: ['super-admin'],
    method: AllHttpMethod,
  },
  {
    apiRouter: '/accounts/[id]',
    role: ['super-admin'],
    method: AllHttpMethod,
  },
  {
    apiRouter: '/daos/[id]',
    role: ['super-admin'],
    method: AllHttpMethod,
  },
  {
    apiRouter: '/daos',
    role: ['super-admin', 'admin'],
    method: AllHttpMethod,
  },
  {
    apiRouter: '/daos/add',
    role: ['super-admin', 'admin'],
    method: AllHttpMethod,
  },
  //backend api:
  {
    apiRouter: '/api/v2/user',
    role: ['super-admin', 'admin'],
    method: AllHttpMethod,
  },
  {
    apiRouter: '/api/v2/user',
    role: ['member'],
    method: [HttpMethod.GET],
  },
  {
    apiRouter: '/api/v2/user/list',
    role: ['super-admin', 'admin'],
    method: AllHttpMethod,
  },
  {
    apiRouter: '/api/v2/sign-in',
    role: ['super-admin', 'admin', 'member'],
    method: [HttpMethod.POST],
  },
]

export { logoAddress }
