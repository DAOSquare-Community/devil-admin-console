// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { request } from 'lib/request/axios-helper'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import uuidBase62 from 'uuid-base62'
import DaoService from 'service/dao'
import { OpenApi } from 'models/Dao'

type Data = {
  organization: {
    task: { id: string; status: 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'DONE' }[]
  }
}
// 5T2WcpGDJ3m6cOiG5ItJeL
const fetchDeworkData = async (daoId: string) => {
  const dao = await new DaoService().getDaoInfo(daoId)
  if (!!dao) {
    const orgId = (dao.open_api as OpenApi).dework?.orgId
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    getHanler(req, res)
  } else {
    res.status(405).end('Method Not Allowed')
  }
}

const getHanler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { daoId } = req.query
  try {
    if (typeof daoId === 'string') {
      const data = await fetchDeworkData(daoId)
      if (!!data) {
        res.status(200).json(data)
      } else {
        throw new Error('Fetch error')
      }
    } else {
      throw new Error('Require daoId')
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).end('failed to load data')
    }
  }
}
