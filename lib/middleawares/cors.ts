import {
  createMiddlewareDecorator,
  NextFunction,
} from '@storyofams/next-api-decorators'
import { NextApiRequest, NextApiResponse } from 'next'
import NextCors from 'nextjs-cors'

const CrosGuard = createMiddlewareDecorator(
  (req: NextApiRequest, res: NextApiResponse, next: NextFunction) => {
    NextCors(req, res, { methods: req.method, origin: '*' })
    next()
  }
)

export default CrosGuard
