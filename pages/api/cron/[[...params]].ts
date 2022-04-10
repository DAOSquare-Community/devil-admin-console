// get coin info

import { createHandler, Post, Req } from '@storyofams/next-api-decorators'
import { NextApiRequest } from 'next'

class CronController {
  @Post()
  public async try(@Req() req: NextApiRequest) {
    return req.query
  }
}

export default createHandler(CronController)
