import { Get, createHandler, Req } from '@storyofams/next-api-decorators'
import { NextApiRequest } from 'next'
import { getToken } from 'next-auth/jwt'
import UserService from 'service/user'
import { ResultMsg } from 'types/resultmsg'
import { MeInterface } from 'types/user'

class MeController {
  private _service = new UserService()

  /**
   * @swagger
   * /api/v2/user:
   *   get:
   *     tags:
   *       - user
   *     summary: Returns user object
   *     parameters:
   *            - name: id
   *              required: true
   *              in: query
   *              type: string
   *
   *     responses:
   *       200:
   *         description: user list
   *         content:
   *           application/json:
   *             schema:
   *               type: ResultMsg<User | null>
   */
  @Get()
  public async getUserById(
    @Req() req: NextApiRequest
  ): Promise<ResultMsg<MeInterface | null>> {
    const token = await getToken({ req, secret: process.env.JWT_SECRET })
    return { data: token?.user }
  }
}

export default createHandler(MeController)
