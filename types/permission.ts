import { HttpMethod } from 'types/const-enum'
// import { HttpMethod } from './const-enum'

type Role = 'super-admin' | 'admin' | 'member' | 'guest'

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
  role: Role[]
  method: HttpMethod[]
}

export type { Role, RoleApiPermission }
