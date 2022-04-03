import { LogOp } from './../../models/LogOp'
import { HttpMethod, MsgCode } from 'types/const-enum'
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
    try {
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
          oplogEntity.params = req.query ? JSON.stringify(req.query) : ''
          const _service = new LogOpService()
          const result = await _service.insertEntity(oplogEntity)
          if (result.message)
            throw new InternalServerErrorException(result.message)
        }
      }
    } catch (err) {
      const error = err instanceof Error ? err.message : MsgCode.FAILURE
      console.log(`OpLogGuard--${error}`)
    }

    next()
  }
)

export default OpLogGuard
