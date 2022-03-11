import { HttpMethod } from './const-enum'

type Role = 'super-admin' | 'admin' | 'member'

/**
 * the role api permission
 *
 * @example
 * {
 *   apiRouter:'/user'
 *   role:['super-admin','admin']
 *   method:['GET','POST','DELETE','PUT']
 * }
 */
type RoleApiPermission = {
  apiRouter: string
  role: string[]
  method: string[]
}

export type { Role, RoleApiPermission }
