// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { request } from 'lib/request/axios-helper'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import uuidBase62 from 'uuid-base62'
type Data = {
  organization: {
    task: { id: string; status: 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'DONE' }[]
  }
}
// 5T2WcpGDJ3m6cOiG5ItJeL
const fetchDeworkData = async (daoId: string) => {
  const orgId = '5T2WcpGDJ3m6cOiG5ItJeL'
  return request({
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { daoId } = req.query
  if (typeof daoId === 'string') {
    const data = await fetchDeworkData(daoId)
    res.status(200).json(data)
  }
  res.status(500)
}
