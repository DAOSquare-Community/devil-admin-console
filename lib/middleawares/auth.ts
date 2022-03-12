import { RoleApis } from './../config/index'
import { Role } from 'types/permission'
import {
  createMiddlewareDecorator,
  NextFunction,
  UnauthorizedException,
} from '@storyofams/next-api-decorators'
import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import { UserType } from 'types/user'

const NextAuthGuard = createMiddlewareDecorator(
  async (req: NextApiRequest, _res: NextApiResponse, next: NextFunction) => {
    const token = await getToken({ req, secret: process.env.JWT_SECRET })
    if (!token || !token.user) {
      throw new UnauthorizedException()
    }

    const user: UserType = token.user as UserType
    const roles =
      !user.roles || user.roles.length <= 0 ? ['member'] : user.roles

    const roleApiRouters = RoleApis.filter((value) => {
      return (
        value.apiRouter === req.url &&
        value.method.includes(req.method?.toUpperCase() ?? '') &&
        value.role.findIndex((r) => {
          return roles.includes(r as Role)
        }) >= 0
      )
    })

    if (!roleApiRouters || roleApiRouters.length <= 0) {
      throw new UnauthorizedException()
    }

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
