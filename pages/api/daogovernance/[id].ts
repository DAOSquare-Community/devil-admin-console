// get Governance info in daosquare

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { request } from 'lib/request/axios-helper'

const DAOSQUARE_CONTRACT_ADDRESS = '0x1109136c32d6a2138dc0379b734d84ad0c2ffb1b'

const QUERY_MEMBER_IDS = `query membersList($contractAddr: String!, $skip: Int){
    daoMembers: members(
      where: {molochAddress:$contractAddr}
      skip: $skip
    ) {
      id
    }
  }`

const QUERY_PROPOSALS = `query molochActivities($contractAddr: String!, $createdAt: String!){
    proposals(
      where: {molochAddress: $contractAddr, createdAt_gt: $createdAt}
    ) {
      id
      aborted
      applicant
      cancelled
      cancelledAt
      createdAt
      createdBy
      details
      didPass
      executed
      gracePeriodEnds
      guildkick
      isMinion
      lootRequested
      memberAddress
      newMember
      noShares
      noVotes
      paymentRequested
      paymentTokenDecimals
      paymentTokenSymbol
      processed
      processor
      processedAt
      proposer
      proposalId
      proposalIndex
      sharesRequested
      sponsored
      sponsor
      sponsoredAt
      startingPeriod
      trade
      tributeOffered
      tributeTokenDecimals
      tributeTokenSymbol
      tributeToken
      votingPeriodStarts
      votingPeriodEnds
      whitelist
      yesShares
      yesVotes
      molochAddress
      molochVersion
      minionAddress
      uberHausMinionExecuted
      votes {
        id
      }
    }
  
  }`

type Data = {
  id: string
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
      executed: boolean
    }[]
  }
}
// daosquare
const fetchDaoProposalsData = async (): Promise<ProposalsDataType> => {
  return request({
    url: 'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus-xdai',
    method: 'POST',
    payload: {
      query: QUERY_PROPOSALS,
      variables: {
        contractAddr: DAOSQUARE_CONTRACT_ADDRESS,
        createdAt: '0',
      },
    },
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query
  if (typeof id === 'string' && id === 'daosquare') {
    const membersData = await fetchDaoMemberData()
    const proposalsData = await fetchDaoProposalsData()

    let unsponsoredCount = 0 // 无赞助的提案
    const votingCount = 0 // 投票期的提案
    const graceCount = 0 // 宽限期的提案
    let processCount = 0 // 正在处理的提案
    let passedCount = 0 // 已通过的提案
    let executedCount = 0 // 已执行的提案

    if (!!proposalsData) {
      //无赞助的提案
      unsponsoredCount = proposalsData.data.proposals.filter(
        (element) => element.sponsored === false
      ).length

      //正在处理的提案
      processCount = proposalsData.data.proposals.filter(
        (element) => element.processed === false
      ).length

      // 已执行的提案
      executedCount = proposalsData.data.proposals.filter(
        (element) => element.executed === true
      ).length

      // 已通过的提案
      passedCount = proposalsData.data.proposals.filter(
        (element) => element.processed === true
      ).length
    }

    const retData: Data = {
      id: 'daosquare',
      members: !!membersData ? membersData.data.daoMembers.length : 0,
      process: processCount,
      excution: executedCount,
      passed: passedCount,
      unsponsored: unsponsoredCount,
      voting: votingCount,
      grace: graceCount,
    }
    res.status(200).json(retData)
  }
  res.status(500)
}
