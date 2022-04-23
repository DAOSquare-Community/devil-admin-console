import { LogOp } from './../../models/LogOp'
import { HttpMethod } from 'types/const-enum'
import {
  createMiddlewareDecorator,
  InternalServerErrorException,
  NextFunction,
} from '@storyofams/next-api-decorators'
import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import LogOpService from 'service/logop'

const OpLogGuard = createMiddlewareDecorator(
  async (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    const token = await getToken({ req, secret: process.env.JWT_SECRET })
    if (!!token && !!token.user) {
      const addr = token.user.name
      const reqMethod = req.method?.toUpperCase()
      if (
        reqMethod === HttpMethod.PUT ||
        reqMethod === HttpMethod.POST ||
        reqMethod === HttpMethod.DELETE
      ) {
        const oplogEntity = new LogOp()
        oplogEntity.wallet_address = addr
        oplogEntity.path = req.url ?? ''
        oplogEntity.params = req.query ? JSON.stringify(req.body) : ''
        const _service = new LogOpService()
        const result = await _service.insertEntity(oplogEntity)
        if (result.message)
          throw new InternalServerErrorException(result.message)
      }
    }

    next()
  }
)

export default OpLogGuard
