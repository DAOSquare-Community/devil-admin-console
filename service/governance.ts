import { request } from 'lib/request/axios-helper'
import { Dao } from 'models/Dao'
import { ChainEnum } from 'types/const-enum'

/**
 * the data of dao governance
 */
export type GovernanceData = {
  daoId: string
  members: number // 会员数量
  process: number // 正在处理的提案
  excution: number // 已执行的提案
  passed: number // 已通过的提案
  unsponsored: number // 无赞助的提案
  voting: number // 投票期的提案
  grace: number // 宽限期的提案
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

/**
 * the dao governance
 *
 * Notice:At present, the data is obtained from daohaus
 * Date:2022.03.04
 */
export default class Governance {
  private _dao: Dao
  private _daoHausSubgraph_base =
    'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus'

  constructor(dao: Dao) {
    this._dao = dao
  }

  /**
   * get the daohaus subgraph link
   *
   * @memberof Governance
   */
  public getDaoHausSubgraph = (chainType: string) => {
    const chainTypeLower = chainType.toLowerCase()
    let subgraphLink = this._daoHausSubgraph_base
    if (chainTypeLower !== ChainEnum.Mainnet) {
      subgraphLink += `-${chainTypeLower}`
    }
    return subgraphLink
  }

  /**
   * get the Governance  Data
   *
   * @memberof Governance
   */
  public getGovernanceData = async (): Promise<GovernanceData> => {
    let retData: GovernanceData = {
      daoId: '',
      members: 0,
      process: 0,
      excution: 0,
      passed: 0,
      unsponsored: 0,
      voting: 0,
      grace: 0,
    }
    if (!this._dao.daoId) {
      return retData
    }

    retData = await this.getDaoHausGovernanceData()
    return retData
  }

  /**
   * get the Governance data in daohaus platform
   *
   * @private
   * @memberof Governance
   */
  private getDaoHausGovernanceData = async (): Promise<GovernanceData> => {
    const retData: GovernanceData = {
      daoId: this._dao.daoId,
      members: 0,
      process: 0,
      excution: 0,
      passed: 0,
      unsponsored: 0,
      voting: 0,
      grace: 0,
    }
    // get the request link with the chain type
    const subgraphLink = this.getDaoHausSubgraph(
      this._dao.dao_contract.chain_type
    )

    //1. get the memebre data
    const membersData = await this.fetchDaoMemberData(
      subgraphLink,
      QUERY_MEMBER_IDS,
      this._dao.dao_contract.contract_address
    )
    const memberCount = !!membersData ? membersData.data.daoMembers.length : 0
    retData.members = memberCount

    //2. get the  proposals data
    const proposalsData = await this.fetchDaoProposalsData(
      subgraphLink,
      QUERY_PROPOSALS,
      this._dao.dao_contract.contract_address
    )

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
    return retData
  }

  /**
   * fetch dao member data
   *
   * @private
   * @memberof Governance
   */
  private fetchDaoMemberData = async (
    url: string,
    query: string,
    addr: string
  ) => {
    return request({
      url: url,
      method: 'POST',
      payload: {
        query: query,
        variables: {
          contractAddr: addr,
          skip: 0,
        },
      },
    })
  }

  /**
   * fet dao proposals data
   *
   * @private
   * @memberof Governance
   */
  private fetchDaoProposalsData = async (
    url: string,
    query: string,
    addr: string
  ) => {
    return request<ProposalsDataType>({
      url: url,
      method: 'POST',
      payload: {
        operationName: 'molochActivities',
        query: query,
        variables: {
          contractAddr: addr,
          createdAt: '0',
        },
      },
    })
  }
}
