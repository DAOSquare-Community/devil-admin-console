import {
  Get,
  Query,
  createHandler,
  DefaultValuePipe,
  InternalServerErrorException,
  Delete,
  Post,
  Put,
  Body,
} from '@storyofams/next-api-decorators'
import NextAuthGuard from 'lib/middleawares/auth'
import OpLogGuard from 'lib/middleawares/oplog'
import { ResultMsg } from 'types/resultmsg'
import { Activity } from 'models/activity'
import ActivityService from 'service/activity'

@NextAuthGuard()
@OpLogGuard()
class ActivityController {
  private _service = new ActivityService()

  /**
   * get activity list
   * @param page
   * @param pageSize
   * @param filters
   * @param sortBy
   * @returns
   */

  /**
   * @swagger
   * /api/v2/activity/list:
   *   get:
   *     tags:
   *       - activity
   *     summary: get activity list
   *     parameters:
   *            - name: page
   *              required: false
   *              in: query
   *              type: number
   *            - name: pageSize
   *              required: false
   *              in: query
   *              type: number
   *            - name: filters
   *              required: false
   *              in: query
   *              type: object
   *            - name: sortBy
   *              required: false
   *              in: query
   *              type: object
   *
   *     responses:
   *       200:
   *         description: activity list
   *         content:
   *           application/json:
   *             schema:
   *               type: ResultMsg<PageData<Activity>>
   */
  @Get('/list')
  public async getActivityList(
    @Query('page', DefaultValuePipe(0)) page: number,
    @Query('pageSize', DefaultValuePipe(0)) pageSize: number,
    @Query('filters') filters?: string,
    @Query('sortBy') sortBy?: string
  ) {
    try {
      return await this._service.getList(
        page,
        pageSize,
        filters ? JSON.parse(filters) : {},
        sortBy ? JSON.parse(sortBy) : {}
      )
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message)
      }
    }
  }

  /**
   * get activity by id
   * @Query id
   * @returns
   */
  /**
   * @swagger
   * /api/v2/activity:
   *   get:
   *     tags:
   *       - activity
   *     summary: get activity by daoid
   *     parameters:
   *            - name: id
   *              required: true
   *              in: query
   *              type: string
   *
   *     responses:
   *       200:
   *         description: activity object
   *         content:
   *           application/json:
   *             schema:
   *               type: ResultMsg<Activity | null>
   */
  @Get()
  public async getActivityById(
    @Query('id') id: string
  ): Promise<ResultMsg<Activity | null>> {
    const activity = await this._service.getEntity({ _id: id })
    if (activity.message)
      throw new InternalServerErrorException(activity.message)
    return activity
  }

  /**
   * delete activity by filter
   * @param filter
   * @returns
   */

  /**
   * @swagger
   * /api/v2/activity:
   *   delete:
   *     tags:
   *       - activity
   *     summary: delete activity by filter
   *     parameters:
   *            - name: filter
   *              required: true
   *              in: body
   *              type: object
   *
   *     responses:
   *       200:
   *         description: delete activity
   *         content:
   *           application/json:
   *             schema:
   *               type: ResultMsg<boolean>
   */
  @Delete()
  public async deleteUsersByIds(
    @Body() body: { ids: string[] }
  ): Promise<ResultMsg<boolean>> {
    const delUsers = await this._service.deleteEntityByIds(body.ids)
    if (delUsers.message) {
      throw new InternalServerErrorException(delUsers.message)
    }
    return delUsers
  }

  /**
   * insert activity
   * @param activity
   * @returns
   */

  /**
   * @swagger
   * /api/v2/activity:
   *   post:
   *     tags:
   *       - activity
   *     summary: insert a activity
   *     parameters:
   *            - name: body
   *              required: true
   *              in: body
   *              type: object
   *
   *     responses:
   *       200:
   *         description: insert a activity
   *         content:
   *           application/json:
   *             schema:
   *               type: ResultMsg<boolean>
   */
  @Post()
  public async insertActity(@Body() body: object): Promise<ResultMsg<boolean>> {
    const activity = new Activity()
    const d = Object.assign(activity, body)
    const ret = await this._service.insertEntity(d)
    if (ret.message) {
      throw new InternalServerErrorException(ret.message)
    }
    return ret
  }

  /**
   * update activity
   * @param filter
   * @param update
   * @returns
   */

  /**
   * @swagger
   * /api/v2/activity:
   *   put:
   *     tags:
   *       - activity
   *     summary: update activity
   *     parameters:
   *            - name: body
   *              required: true
   *              in: body
   *              type: object
   *
   *     responses:
   *       200:
   *         description: update activity
   *         content:
   *           application/json:
   *             schema:
   *               type: ResultMsg<boolean>
   */
  @Put()
  public async updateActivity(
    @Body() body: { filter: object; update: object }
  ): Promise<ResultMsg<boolean>> {
    const ret = await this._service.updateEntity(body.filter, body.update)
    if (ret.message) {
      throw new InternalServerErrorException(ret.message)
    }
    return ret
  }
}

export default createHandler(ActivityController)
