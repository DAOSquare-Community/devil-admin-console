import { request } from 'lib/request/axios-helper'
import waitAsync from 'lib/wait'
import { ChainEnum } from 'types/const-enum'
import { HolderTokens, HToken } from './holdertokens'
import IToken from './IToken'
import * as web3Utils from 'web3-utils'

/**
 * Get list of tokens owned by address.
 * getHolderTokensByAddress
 */
type TokenBalance = {
  balance: number
  contractAddress: string
  decimals: number
  name: string
  symbol: string
}

type Result<T> = {
  message: string
  result: T
  status: '0' | '1'
}

/**
 * the xdai helper
 * use the blockscout API
 * @link https://blockscout.com/xdai/mainnet/api-docs
 */
class XDaiplorer implements IToken {
  //  the XDaiplorer API  url
  private _url = 'https://blockscout.com/xdai/mainnet/api'
  //private _apiKey = process.env.ETHPLORER_API_KEY
  // delay 500 ms,
  private _delayMs = 500

  static instance: XDaiplorer | null
  /** get DB single instance */
  static getInstance(): XDaiplorer | null {
    if (!XDaiplorer.instance) {
      this.instance = new XDaiplorer()
    }
    return this.instance
  }

  /**
   * get holder tokens  by  address
   * @param addr
   * @returns
   */
  public getHolderTokensByAddress = async (
    addr: string
  ): Promise<HolderTokens | null> => {
    // wait 100ms
    await waitAsync(this._delayMs)
    const addressInfoApiUrl = `${this._url}?module=account&action=tokenlist&address=${addr}`
    const ret = await request<Result<TokenBalance[]>>({
      url: addressInfoApiUrl,
      method: 'GET',
    })

    if (ret.status === '0') throw new Error(ret.message)

    if (!ret.result || ret.result.length === 0) return null

    // TODO: need price,datetime,currency
    const dateTime = new Date().getUTCSeconds()
    const cur = 'USD'
    const tokens: HToken[] = []
    let allAmount = 0
    ret.result.forEach((item) => {
      const price = 0
      const balance = Number(item.balance) / 10 ** Number(item.decimals)
      const totalAmount = price * balance
      const token: HToken = {
        address: item.contractAddress,
        symbol: item.symbol,
        price: price,
        balance: balance,
        totalAmount: totalAmount,
      }
      tokens.push(token)
      allAmount += totalAmount
    })

    const holderTokens: HolderTokens = {
      totalAmount: allAmount,
      chainType: ChainEnum.xDai,
      tokens: tokens,
      ts: dateTime,
      currency: cur,
    }
    return holderTokens
  }

  /**
   * get the holders by address
   * @param addr
   * @returns
   */
  public getHoldersCount = async (addr: string): Promise<number> => {
    // wait 100ms
    await waitAsync(this._delayMs)
    let holders = 0
    //blockscout.com/xdai/mainnet/api
    // 获取混合大小写的地址，否则无法获取数据
    const eip55_addr = web3Utils.toChecksumAddress(addr)
    const tokenInfoApiUrl = `https://blockscout.com/xdai/mainnet/token-counters?id=${eip55_addr}`

    const ret = await request<{ token_holder_count: number }>({
      url: tokenInfoApiUrl,
      method: 'GET',
    })
    holders = ret.token_holder_count
    return holders
  }
}

export default XDaiplorer
