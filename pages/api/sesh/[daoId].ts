import type { NextApiRequest, NextApiResponse } from 'next'
import { request } from 'lib/request/axios-helper'

import NextCors from 'nextjs-cors'
import DaoService from 'service/dao'
import { OpenApi } from 'models/Dao'

type Data = {
  rsvp_options: unknown
  start_time: string
  end_time: string
}[]

// 941665725112782868
const fetchCalendarEvents = async (daoId: string) => {
  const dao = await new DaoService().getDaoInfo(daoId)
  if (!dao.message) {
    const sesh = (dao.data?.open_api as OpenApi).sesh
    if (!!sesh) {
      return request<{ props: Data }>({
        url: `https://sesh.fyi/api/get_event_listings`,
        method: 'post',
        payload: {
          access_token: sesh.access_token,
          token_type: 'Bearer',
          guild_id: sesh.guild_id,
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
    await NextCors(req, res, { methods: ['GET'], origin: '*' })
    getHanler(req, res)
  } else {
    res.status(405).end('Method Not Allowed')
  }
}

const getHanler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { daoId } = req.query
  try {
    if (typeof daoId === 'string') {
      const data = await fetchCalendarEvents(daoId)
      if (!!data && data.props) {
        res.status(200).json(data.props)
      } else {
        throw new Error('Fetch error')
      }
    } else {
      throw new Error('Require daoId')
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).end(error.message)
    }
  }
}
