import { HttpMethod } from 'types/const-enum'
import { RoleApis } from './../config/index'
import {
  createMiddlewareDecorator,
  NextFunction,
  UnauthorizedException,
} from '@storyofams/next-api-decorators'
import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

const NextAuthGuard = createMiddlewareDecorator(
  async (req: NextApiRequest, _res: NextApiResponse, next: NextFunction) => {
    const token = await getToken({ req, secret: process.env.JWT_SECRET })
    if (!token || !token.user) {
      throw new UnauthorizedException()
    }

    const { user } = token
    const roles =
      !user.roles || user.roles.length === 0 ? ['member'] : user.roles

    let hasRolePermission = false

    for (const value of RoleApis) {
      hasRolePermission =
        value.apiRouter ===
          new URL(req.url ?? '', `http://${req.headers.host}`).pathname &&
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@varts-ignore
        value.method.includes(<HttpMethod>req.method?.toUpperCase() ?? '') &&
        value.role.findIndex((r) => {
          return roles.includes(r)
        }) >= 0
      if (hasRolePermission) break
    }

    // no permission
    if (!hasRolePermission) throw new UnauthorizedException()

    //Todo: update
    // req.user = {
    //   name: token.name,
    //   role: 'super-admin',
    //   walletAddr: 'asdasdas',
    // }

    // "sign-in" except 要排除例外的请求路由

    next()
  }
)

export default NextAuthGuard
