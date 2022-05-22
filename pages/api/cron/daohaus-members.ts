import {
  createHandler,
  InternalServerErrorException,
  Post,
  Req,
} from '@storyofams/next-api-decorators'
import dayjs from 'dayjs'
import { request } from 'lib/request/axios-helper'
import { Member } from 'models/Member'

import { NextApiRequest } from 'next'
import DaoService from 'service/dao'
import MemberService from 'service/member'
import { ChainEnum, MsgCode } from 'types/const-enum'

type MolochesDataType = {
  data: {
    moloches: Moloche[]
  }
}

type Moloche = {
  id: string
  guildBankAddress: string | null
  summoningTime: string | null
  summoner: string | null
  members?: MolocheMember[]
}

type MolocheMember = {
  id: string
}

class DaoHausMembersController {
  private _daoHausSubgraph_base =
    'https://api.thegraph.com/subgraphs/name/odyssy-automaton/daohaus'
  // 每1000条一次，直到获取不到1000条数据，表明已经取完
  private _QUERY_MOLOCHES = `query moloches($skip: Int){
    moloches(first: 1000, skip: $skip) {
      id
      guildBankAddress
      summoningTime
      summoner
      members(where: {exists: true}) {
        id
      }
    }
  }`
  private _daoService = new DaoService()
  private _memberService = new MemberService()

  // Post /api/cron/daohaus-members/
  @Post()
  public async getDaoMembers(@Req() req: NextApiRequest) {
    //   const { authorization } = req.headers
    //   if (authorization !== `Bearer ${process.env.API_SECRET_KEY}`)
    //     throw new ForbiddenException(MsgCode.AUTH_FAILED)
    try {
      const chaintypes = Object.values(ChainEnum)
      chaintypes.forEach(async (chain) => {
        const queryUrl =
          chain === ChainEnum.Mainnet
            ? this._daoHausSubgraph_base
            : `${this._daoHausSubgraph_base}-${chain}`
        await this.loopFetchMolochesData(chain, queryUrl)
      })
    } catch (err) {
      throw new InternalServerErrorException(
        err instanceof Error ? err.message : MsgCode.FAILURE
      )
    } // end for  try...catch

    //private
  }

  /**
   * 获取指定页数的Molocches数据
   * @param skip
   */
  private async getMolochesData(
    subgraphURL: string,
    skip: number
  ): Promise<MolochesDataType> {
    const ret: MolochesDataType = {
      data: {
        moloches: [],
      },
    }
    if (!subgraphURL) return ret
    if (skip < 0) skip = 0

    return await request<MolochesDataType>({
      url: subgraphURL,
      method: 'POST',
      payload: {
        query: this._QUERY_MOLOCHES,
        variables: {
          skip: skip,
        },
      },
    })
  }

  // 每1000条一次获取MolochesData，直到获取不到1000条数据，表明已经取完
  private async loopFetchMolochesData(chain: string, queryUrl: string) {
    const size = 1000
    let skip = 0
    let retCount = 0
    do {
      try {
        const moloches = await this.getMolochesData(queryUrl, skip)
        retCount = moloches.data.moloches.length
        skip += size
        // save the moloches data
        if (retCount !== 0) this.saveMolocheData(chain, moloches.data.moloches)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log((<Error>error).message)
        continue
      }
    } while (retCount === size)
  }

  // save the moloche's data
  private async saveMolocheData(chain: string, moloches: Moloche[]) {
    moloches.forEach(async (moloche) => {
      try {
        const filter = {
          'dao_contract.chain_type': chain,
          'dao_contract.contract_address': moloche.id,
        }
        // 获取DAO信息
        const dao = await this._daoService.getEntity(filter)
        if (dao.data) {
          // 更新DAO信息
          const daoId = dao.data.daoId
          const idFilter = { _id: dao.data._id }
          const update = {
            start_time: moloche.summoningTime
              ? dayjs.unix(Number.parseInt(moloche.summoningTime)).toDate()
              : null,
            founder: moloche.summoner ? [moloche.summoner] : [],
            treasury: moloche.guildBankAddress
              ? {
                  chain_type: chain,
                  contract_address: moloche.guildBankAddress,
                  json_url: '',
                }
              : null,
          }
          await this._daoService.updateEntity(idFilter, update)

          // 更新member信息
          if (!moloche.members) return
          moloche.members.forEach(async (mid) => {
            const ids = mid.id.split('-')
            const mAddr = ids[2]
            // 获取member信息
            const mFilter = {
              wallet_address: mAddr,
            }
            const member = await this._memberService.getEntity(mFilter)
            if (!member.data) {
              // 插入数据
              const mObj = new Member()
              const mDaos = [daoId]
              mObj.wallet_address = mAddr
              mObj.daos = mDaos
              await this._memberService.insertEntity(mObj)
            } else {
              let mDaos = member.data.daos
              if (mDaos.length > 0 && !mDaos.includes(daoId)) {
                mDaos.push(daoId)
              } else {
                mDaos = [daoId]
              }
              const mUpdate = {
                daos: mDaos,
              }
              await this._memberService.updateEntity(mFilter, mUpdate)
            }
          })
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log((<Error>error).message)
        // TODO 暂不处理异常
      }
    })
  }
}

export default createHandler(DaoHausMembersController)
