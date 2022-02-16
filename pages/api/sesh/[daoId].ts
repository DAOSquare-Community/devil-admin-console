import type { NextApiRequest, NextApiResponse } from 'next'
import { request } from 'lib/request/axios-helper'
import runMiddleware from 'lib/middleware/runMiddleware'
import Cors from 'cors'
type Data = {
  rsvp_options: unknown
  start_time: string
  end_time: string
}[]

const cors = Cors({
  methods: ['GET', 'HEAD'],
})
// 941665725112782868
const fetchCalendarEvents = async (orgId: string) => {
  return request<{ props: Data }>({
    url: `https://sesh.fyi/api/get_event_listings`,
    method: 'post',
    payload: {
      access_token: '9xbD4YkcTJ22SQZy55CJzMfncII0X6',
      token_type: 'Bearer',
      guild_id: '678414857510453309',
    },
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await runMiddleware(req, res, cors)
  const { daoId } = req.query
  if (typeof daoId === 'string') {
    const data = await fetchCalendarEvents(daoId)
    res.status(200).json(data.props)
  }

  res.status(500)
}
