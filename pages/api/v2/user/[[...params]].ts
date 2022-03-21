import {
  Get,
  Query,
  createHandler,
  ParseNumberPipe,
  DefaultValuePipe,
  SetHeader,
  Req,
  InternalServerErrorException,
  Param,
  Delete,
  Post,
  Put,
  Body,
} from '@storyofams/next-api-decorators'
import NextAuthGuard from 'lib/middleawares/auth'
import { User } from 'models/User'
import { NextApiRequest } from 'next'
import UserService from 'service/user'
import { PageData, ResultMsg } from 'types/resultmsg'

interface User1 {
  id: number
  name: string
  email: string
}

const sampleUserData: User1[] = [
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

type UserIds = {
  userIds: string[]
}

@NextAuthGuard()
class UserController {
  private _service = new UserService()

  // GET /api/users
  @Get('/example')
  @SetHeader('Cache-Control', 'nostore')
  public getExampleUsers(
    @Req() req: NextApiRequest,
    @Query('skip', DefaultValuePipe(0), ParseNumberPipe) skip: number,
    @Query('limit', ParseNumberPipe({ nullable: true })) limit?: number
  ) {
    return sampleUserData.slice(skip, limit)
  }

  /**
   * get user list
   * @param page
   * @param pageSize
   * @param queryParams
   * @param sortParams
   * @returns
   */
  @Get('/list')
  public async getUserList(
    @Query('page', DefaultValuePipe(0)) page: number,
    @Query('pageSize', DefaultValuePipe(0)) pageSize: number,
    @Query('queryParams') queryParams?: object,
    @Query('sortParams') sortParams?: object
  ): Promise<ResultMsg<PageData<User>>> {
    const ret = await this._service.getList(
      page,
      pageSize,
      queryParams ?? {},
      sortParams ?? {}
    )
    if (ret.message) {
      throw new InternalServerErrorException(ret.message)
    }
    return ret
  }

  /**
   * get user by id
   * @param id
   * @returns
   */
  @Get()
  public async getUserById(
    @Query('id') id: string
  ): Promise<ResultMsg<User | null>> {
    const user = await this._service.getEntityById(id)
    //console.log(user)
    if (user.message) {
      throw new InternalServerErrorException(user.message)
    }
    return user
  }

  /**
   * delete users by ids
   * @param Ids
   * @returns
   */
  @Delete()
  public async deleteUsersByIds(
    @Body() body: UserIds
  ): Promise<ResultMsg<boolean>> {
    const delUsers = await this._service.deleteEntityByIds(body.userIds)
    if (delUsers.message) {
      throw new InternalServerErrorException(delUsers.message)
    }
    return delUsers
  }

  /**
   * insert user
   * @param user
   * @returns
   */
  @Post()
  public async insertUser(
    @Param('user') user: User
  ): Promise<ResultMsg<boolean>> {
    const ret = await this._service.insertEntity(user)
    if (ret.message) {
      throw new InternalServerErrorException(ret.message)
    }
    return ret
  }

  /**
   * update user
   * @param filter
   * @param update
   * @returns
   */
  @Put()
  public async updateUser(
    @Param('filter') filter: object,
    @Param('update') update: object
  ): Promise<ResultMsg<boolean>> {
    const ret = await this._service.updateEntity(filter, update)
    if (ret.message) {
      throw new InternalServerErrorException(ret.message)
    }
    return ret
  }
}

export default createHandler(UserController)
