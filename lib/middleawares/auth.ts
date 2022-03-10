import {
  createMiddlewareDecorator,
  NextFunction,
  UnauthorizedException,
} from '@storyofams/next-api-decorators'
import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

const NextAuthGuard = createMiddlewareDecorator(
  async (req: NextApiRequest, _res: NextApiResponse, next: NextFunction) => {
    // const token = await getToken({ req, secret: process.env.JWT_SECRET })
    // if (!token || !token.name) {
    //   throw new UnauthorizedException()
    // }

    // //Todo: update
    // req.user = {
    //   name: token.name,
    //   role: 'super-admin',
    //   walletAddr: 'asdasdas',
    // }
    next()
  }
)

export default NextAuthGuard
