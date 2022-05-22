import {
  HiHome,
  HiMoon,
  HiPaperClip,
  HiUserGroup,
  HiUsers,
} from 'react-icons/hi'
const logoAddress = 'https://iph.href.lu/80x15?text=logo&fg=000000&bg=ffffff'

import memoryCache, { CacheClass } from 'memory-cache'
import { MenuName } from 'types/page'
import { Role, RoleApiPermission } from 'types/permission'
import { IconType } from 'react-icons'
import { HttpMethod } from 'types/const-enum'

export enum SessionStorageKeys {
  DEEP_URL_KEY = 'DEEP_URL_KEY',
}

export const HomeRoute = '/'

export const MenuConfigMap: Map<
  MenuName,
  { name?: string; Icon: IconType; router?: string }
> = new Map([
  ['dashboard', { Icon: HiHome, router: '/admin' }],
  ['daos', { Icon: HiUserGroup, router: '/admin/daos' }],
  ['accounts', { Icon: HiUsers, router: '/admin/accounts' }],
  ['members', { Icon: HiUsers, router: '/admin/members' }],
  ['activity', { Icon: HiPaperClip, router: '/admin/activity' }],
  ['action-log', { Icon: HiMoon, router: '/admin/action-log' }],
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
    apiRouter: '/admin',
    role: ['super-admin', 'admin', 'member'],
    method: AllHttpMethod,
  },
  {
    apiRouter: '/admin/accounts',
    role: ['super-admin'],
    method: AllHttpMethod,
  },
  {
    apiRouter: '/admin/accounts/add',
    role: ['super-admin'],
    method: AllHttpMethod,
  },
  {
    apiRouter: '/admin/accounts/[id]',
    role: ['super-admin'],
    method: AllHttpMethod,
  },
  {
    apiRouter: '/admin/daos/[id]',
    role: ['super-admin'],
    method: AllHttpMethod,
  },
  {
    apiRouter: '/admin/daos',
    role: ['super-admin', 'admin'],
    method: AllHttpMethod,
  },
  {
    apiRouter: '/admin/activity',
    role: ['super-admin', 'admin'],
    method: AllHttpMethod,
  },
  {
    apiRouter: '/admin/activity/add',
    role: ['super-admin', 'admin'],
    method: AllHttpMethod,
  },
  {
    apiRouter: '/admin/activity/[id]',
    role: ['super-admin', 'admin'],
    method: AllHttpMethod,
  },
  {
    apiRouter: '/admin/daos/add',
    role: ['super-admin', 'admin'],
    method: AllHttpMethod,
  },
  {
    apiRouter: '/admin/action-log',
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
    apiRouter: '/admin/members',
    role: ['super-admin'],
    method: AllHttpMethod,
  },
  {
    apiRouter: '/api/v2/sign-in',
    role: ['super-admin', 'admin', 'member', 'guest'],
    method: [HttpMethod.POST],
  },
  {
    apiRouter: '/api/v2/logop',
    role: ['super-admin', 'admin'],
    method: [HttpMethod.GET],
  },
  {
    apiRouter: '/api/v2/logop/list',
    role: ['super-admin', 'admin'],
    method: [HttpMethod.GET],
  },
  {
    apiRouter: '/api/v2/sysconfig',
    role: ['super-admin', 'admin'],
    method: AllHttpMethod,
  },
  {
    apiRouter: '/api/v2/sysconfig/list',
    role: ['super-admin', 'admin'],
    method: [HttpMethod.GET],
  },
  {
    apiRouter: '/api/v2/dao',
    role: ['super-admin', 'admin'],
    method: AllHttpMethod,
  },
  {
    apiRouter: '/api/v2/dao',
    role: ['member', 'guest'],
    method: [HttpMethod.GET],
  },
  {
    apiRouter: '/api/v2/dao/dkp',
    role: ['super-admin', 'admin', 'member', 'guest'],
    method: [HttpMethod.GET],
  },
  {
    apiRouter: '/api/v2/dao/list',
    role: ['super-admin', 'admin', 'member', 'guest'],
    method: [HttpMethod.GET],
  },
  {
    apiRouter: '/api/v2/member',
    role: ['super-admin', 'admin'],
    method: AllHttpMethod,
  },
  {
    apiRouter: '/api/v2/member',
    role: ['member', 'guest'],
    method: [HttpMethod.GET],
  },
  {
    apiRouter: '/api/v2/member/list',
    role: ['super-admin', 'admin', 'member', 'guest'],
    method: [HttpMethod.GET],
  },
  {
    apiRouter: '/api/v2/member/daos',
    role: ['super-admin', 'admin', 'member', 'guest'],
    method: [HttpMethod.GET],
  },
  // data api
  {
    apiRouter: '/api/v2/sesh',
    role: ['super-admin', 'admin', 'member', 'guest'],
    method: [HttpMethod.GET],
  },
  {
    apiRouter: '/api/v2/twitter',
    role: ['super-admin', 'admin', 'member', 'guest'],
    method: [HttpMethod.GET],
  },
  {
    apiRouter: '/api/v2/discord',
    role: ['super-admin', 'admin', 'member', 'guest'],
    method: [HttpMethod.GET],
  },
  {
    apiRouter: '/api/v2/dework',
    role: ['super-admin', 'admin', 'member', 'guest'],
    method: [HttpMethod.GET],
  },
  {
    apiRouter: '/api/v2/daostats/history',
    role: ['super-admin', 'admin', 'member', 'guest'],
    method: [HttpMethod.GET],
  },
  {
    apiRouter: '/api/v2/daostats/list',
    role: ['super-admin', 'admin', 'member', 'guest'],
    method: [HttpMethod.GET],
  },
  {
    apiRouter: '/api/v2/daostats',
    role: ['super-admin', 'admin', 'member', 'guest'],
    method: [HttpMethod.GET],
  },
  {
    apiRouter: '/api/v2/daogovernance',
    role: ['super-admin', 'admin', 'member', 'guest'],
    method: [HttpMethod.GET],
  },
  {
    apiRouter: '/api/v2/activity',
    role: ['super-admin', 'admin', 'member', 'guest'],
    method: AllHttpMethod,
  },
  {
    apiRouter: '/api/v2/activity/list',
    role: ['super-admin', 'admin', 'member', 'guest'],
    method: AllHttpMethod,
  },
  {
    apiRouter: '/api/v2/aggregate',
    role: ['super-admin', 'admin', 'member', 'guest'],
    method: [HttpMethod.GET],
  },
]

export { logoAddress }
