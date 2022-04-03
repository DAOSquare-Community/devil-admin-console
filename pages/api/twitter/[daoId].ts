import type { NextApiRequest, NextApiResponse } from 'next'
import { request } from 'lib/request/axios-helper'
import DaoService from 'service/dao'
import { OpenApi } from 'models/Dao'

type Data = {
  organization: {
    task: { id: string; status: 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'DONE' }[]
  }
}
const authorization = process.env.ORBIT_TOKEN ?? ''
const path = process.env.ORBIT_PATH ?? ''

// 941665725112782868
const fetchTwitterData = async (daoId: string) => {
  const dao = await new DaoService().getDaoInfo(daoId)
  if (!dao.message) {
    const twitterId = (dao.data?.open_api as OpenApi).twitter?.twitterId
    if (!!twitterId?.length) {
      return request<Data>({
        url: `https://app.orbit.love/api/v1/${path}/members/${twitterId}`,
        method: 'get',
        headers: {
          Authorization: authorization,
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
      const data = await fetchTwitterData(daoId)
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
      res.status(500).end(error.message)
    }
  }
}
