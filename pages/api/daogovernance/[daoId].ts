// get Governance info in daosquare

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { request } from 'lib/request/axios-helper'
import NextCors from 'nextjs-cors'

const DAOSQUARE_CONTRACT_ADDRESS = '0x1109136c32d6a2138dc0379b734d84ad0c2ffb1b'

const QUERY_MEMBER_IDS = `query membersList($contractAddr: String!, $skip: Int){
    daoMembers: members(
      where: {molochAddress:$contractAddr}
      first: 1000
      skip: $skip
    ) {
      id
    }
  }`

const QUERY_PROPOSALS = `query molochActivities($contractAddr: String!, $createdAt: String!){
    proposals(
      where: {molochAddress: $contractAddr, createdAt_gt: $createdAt}
      first: 1000
    ) {
      id
      aborted
      createdAt
      cancelled
   
      executed
      gracePeriodEnds
  
      processed
  
      sponsored
     
      startingPeriod
      
      votingPeriodStarts
      votingPeriodEnds
      
      votes {
        id
      }
    }
  
  }`

type Data = {
  daoId: string
  members: number // 会员数量
  process: number // 正在处理的提案
  excution: number // 已执行的提案
  passed: number // 已通过的提案
  unsponsored: number // 无赞助的提案
  voting: number // 投票期的提案
  grace: number // 宽限期的提案
}

// daosquare
const fetchDaoMemberData = async () => {
  return request({
    url: 'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-xdai',
    method: 'POST',
    payload: {
      query: QUERY_MEMBER_IDS,
      variables: {
        contractAddr: DAOSQUARE_CONTRACT_ADDRESS,
        skip: 0,
      },
    },
  })
}

type ProposalsDataType = {
  data: {
    proposals: {
      sponsored?: boolean
      processed?: boolean
      executed?: boolean
      cancelled?: boolean
      gracePeriodEnds?: string
      votingPeriodStarts?: string
      votingPeriodEnds?: string
      aborted?: boolean
    }[]
  }
}
// daosquare
const fetchDaoProposalsData = async () => {
  return request<ProposalsDataType>({
    url: 'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-xdai',
    method: 'POST',
    payload: {
      operationName: 'molochActivities',
      query: QUERY_PROPOSALS,
      variables: {
        contractAddr: DAOSQUARE_CONTRACT_ADDRESS,
        createdAt: '0',
      },
    },
  })
}

/**
 * @swagger
 * /api/daogovernanace/{daoId}:
 *   get:
 *     tags:
 *       - data-api
 *     summary: get daogovernanace data,only daosquare data
 *     parameters:
 *            - name: daoId
 *              required: true
 *              in: path
 *              type: string
 *
 *     responses:
 *       200:
 *         description: daogovernanace data
 *         content:
 *           application/json:
 *             schema:
 *               type: Data
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })

  const { daoId } = req.query
  if (typeof daoId === 'string') {
    const retData: Data = {
      daoId: 'daosquare',
      members: 0,
      process: 0,
      excution: 0,
      passed: 0,
      unsponsored: 0,
      voting: 0,
      grace: 0,
    }
    const membersData = await fetchDaoMemberData()
    retData.members = !!membersData ? membersData.data.daoMembers.length : 0

    const proposalsData = await fetchDaoProposalsData()

    if (!!proposalsData) {
      const dateNow: Date = new Date()
      proposalsData.data.proposals.forEach((item) => {
        if (!item.aborted && !item.cancelled) {
          // 无赞助的提案
          if (!item.sponsored) {
            retData.unsponsored++
          }

          // 正在处理的提案
          if (!item.processed) {
            retData.process++
          }

          // 已执行的提案
          if (item.processed && item.executed) {
            retData.excution++
          }

          // 已通过的提案
          if (item.processed) {
            retData.passed++
          }

          // 正在投票的提案
          const votingStartDate = new Date(
            (Number(item.votingPeriodStarts) || 0) * 1000
          )
          const votingEndDate = new Date(
            (Number(item.votingPeriodEnds) || 0) * 1000
          )
          if (dateNow > votingStartDate && dateNow < votingEndDate) {
            retData.voting++
          }

          // 在宽限期的提案
          const graceEndDate = new Date(
            (Number(item.gracePeriodEnds) || 0) * 1000
          )
          if (dateNow > votingEndDate && dateNow < graceEndDate) {
            retData.grace++
          }
        }
      })
    }
    res.status(200).json(retData)
  }
  res.status(500)
}
