// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from 'next'
import { request } from 'lib/request/axios-helper'
import {
  createHandler,
  Get,
  NotFoundException,
  Param,
} from '@storyofams/next-api-decorators'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import uuidBase62 from 'uuid-base62'
import DaoService from 'service/dao'
import { OpenApi } from 'models/Dao'
import CrosGuard from 'lib/middleawares/cors'

type Data = {
  organization: {
    task: { id: string; status: 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'DONE' }[]
  }
}
const fetchDeworkData = async (daoId: string) => {
  const dao = await new DaoService().getDaoInfo(daoId)
  if (!dao.message) {
    const orgId = (dao.data?.open_api as OpenApi).dework?.orgId
    if (!!orgId?.length) {
      return request<Data>({
        url: 'https://api.dework.xyz/graphql',
        method: 'POST',
        payload: {
          query: `
        query DAOSquareDashboardQuery($organizationId:UUID!) {
          organization:getOrganization(id:$organizationId) {
            tasks {
              id
              status
            }
          }
        }
    `,
          variables: {
            organizationId: uuidBase62.decode(orgId),
          },
        },
      })
    }
  }
}
@CrosGuard()
class Handler {
  /**
   * @swagger
   * /api/dework/{daoId}:
   *   get:
   *     tags:
   *       - data-api
   *     summary: get dework data,only daosquare data
   *     parameters:
   *            - name: daoId
   *              required: true
   *              in: path
   *              type: string
   *
   *     responses:
   *       200:
   *         description: dework data
   *         content:
   *           application/json:
   *             schema:
   *               type: Data
   */
  @Get('/:daoId')
  public async fetchDework(@Param('daoId') daoId: string) {
    const data = await fetchDeworkData(daoId)
    if (!data) {
      throw new NotFoundException('Data not found.')
    }
    return data
  }
}

export default createHandler(Handler)
