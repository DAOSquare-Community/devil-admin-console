// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import uuidBase62 from 'uuid-base62'
type Data = {
  name: string
}

const fetchDeworkData = async () => {
  return fetch('https://api.dework.xyz/graphql', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
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
        organizationId: uuidBase62.decode('5T2WcpGDJ3m6cOiG5ItJeL'),
      },
    }),
  }).then((res) => res.json())
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = await fetchDeworkData()
  res.status(200).json(data)
}
