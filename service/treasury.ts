import { TreasuryToken, TreasuryTokenModel } from './../models/TreasuryToken'
import { ChainEnum } from 'types/const-enum'
import { Dao } from 'models/Dao'
import Mainnetplorer from 'lib/onchain/mainnetplorer'
import { HolderTokens } from 'lib/onchain/holdertokens'
import dayjs from 'dayjs'
import BaseService from './base'
import DaoService from './dao'
/**
 * Treasury
 *
 * @export
 * @class Treasury
 */
export default class TreasuryService extends BaseService<
  TreasuryToken,
  typeof TreasuryToken
> {
  constructor() {
    super(TreasuryTokenModel)
  }

  /**
   *  get the Treasury Data  from  db (just with delay)
   * @param daoId
   * @returns
   */
  public getTreasuryDataFormDB = async (
    daoId: string
  ): Promise<TreasuryToken | null> => {
    const ret = await this.model
      .findOne<TreasuryToken>({ daoId: daoId })
      .sort({ ts: -1 })
      .limit(1)
    return ret
  }

  /**
   * get the Treasury Data on chain
   * @param daoId
   * @returns
   */
  public getTreasuryDataFromChain = async (
    daoId: string
  ): Promise<HolderTokens | null> => {
    const ret = await new DaoService().getDaoInfo(daoId)
    if (ret.message) throw new Error(ret.message)
    const dao = ret.data

    return await this.getTokensWithChain(
      <ChainEnum>dao?.treasury.chain_type,
      dao?.treasury.contract_address ?? ''
    )
  }

  /**
   *  get the tokens with  chain type
   * @param chain
   * @param addr
   * @returns
   */
  private getTokensWithChain = async (chain: ChainEnum, addr: string) => {
    let holderTokens: HolderTokens | null = null
    switch (chain) {
      case ChainEnum.Mainnet:
        holderTokens =
          (await Mainnetplorer.getInstance()?.getHolderTokensByAddress(addr)) ??
          null
        break
      case ChainEnum.xDai:
        // holderTokens =
        //   (await XDaiplorer.getInstance()?.getHolderTokensByAddress(addr)) ??
        //   null
        break
      default:
        break
    }
    return holderTokens
  }

  /**
   * add Treasury
   * for corn
   */
  public addTreasuryTokenFromDao = async (
    dao: Dao
  ): Promise<TreasuryToken | null> => {
    const holderTokens = await this.getTokensWithChain(
      <ChainEnum>dao.treasury.chain_type,
      dao.treasury.contract_address
    )

    if (!holderTokens) return null
    const treasuryToken = new TreasuryToken()
    treasuryToken.daoId = dao.daoId
    treasuryToken.treasury_address = dao.treasury.contract_address
    treasuryToken.total_amount = holderTokens.totalAmount
    treasuryToken.chainType = holderTokens.chainType
    treasuryToken.tokens = holderTokens.tokens
    treasuryToken.ts = dayjs.unix(holderTokens.ts).toDate()
    treasuryToken.currency = holderTokens.currency
    treasuryToken.create_at = treasuryToken.last_update_at = new Date()

    const ret = await this.insertEntity(treasuryToken)
    if (ret.message) throw new Error(ret.message)

    if (ret.data) return treasuryToken
    else return null
  }
}
