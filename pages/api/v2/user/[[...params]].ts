import {
  Get,
  Query,
  createHandler,
  ParseNumberPipe,
  DefaultValuePipe,
  SetHeader,
  Req,
} from '@storyofams/next-api-decorators'
import NextAuthGuard from 'lib/middleawares/auth'
import { NextApiRequest } from 'next'

interface User {
  id: number
  name: string
  email: string
}

const sampleUserData: User[] = [
  { id: 101, name: 'Valry', email: 'valry@example.com' },
  { id: 102, name: 'Paulie', email: 'paulie@example.com' },
  { id: 103, name: 'Daryl', email: 'daryl@example.com' },
  { id: 104, name: 'Fabian', email: 'fabian@example.com' },
  { id: 105, name: 'Louisette', email: 'louisette@example.com' },
  { id: 106, name: 'Merrili', email: 'merrili@example.com' },
  { id: 107, name: 'Flor', email: 'flor@example.com' },
  { id: 108, name: 'Iona', email: 'iona@example.com' },
  { id: 109, name: 'Evangelina', email: 'evangelina@example.com' },
]

@NextAuthGuard()
class UserRouter {
  // GET /api/users
  @Get()
  @SetHeader('Cache-Control', 'nostore')
  public listUsers(
    @Req() req: NextApiRequest,
    @Query('skip', DefaultValuePipe(0), ParseNumberPipe) skip: number,
    @Query('limit', ParseNumberPipe({ nullable: true })) limit?: number
  ) {
    // const userService = new UserService()
    req.user?.walletAddr
    console.log(' req.user?.walletAddr', req.user?.walletAddr)

    return sampleUserData.slice(skip, limit)
  }
}

export default createHandler(UserRouter)
