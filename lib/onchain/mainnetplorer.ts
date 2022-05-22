import { request } from 'lib/request/axios-helper'
import waitAsync from 'lib/wait'
import { ChainEnum } from 'types/const-enum'
import { HolderTokens, HToken } from './holdertokens'
import IToken from './IToken'

/**
 * getHolderTokensByAddress
 */
type AddrInfoRes = {
  address?: string
  tokens?: {
    tokenInfo: {
      address: string
      decimals: string
      symbol: string
      price: {
        rate: number
        ts: number
        currency: string
      }
    }
    rawBalance: string
  }[]
  err?: ErrRes
}

type ErrRes = {
  error: {
    code: number
    message: string
  }
}

/**
 * the mainnet helper
 * use the Ethplorer API
 * @link https://github.com/EverexIO/Ethplorer/wiki/Ethplorer-API
 */
class Mainnetplorer implements IToken {
  //  the Ethplorer API  url
  private _url = 'https://api.ethplorer.io'
  private _apiKey = process.env.ETHPLORER_API_KEY ?? 'freekey'
  // delay 100 ms,  Personal key limits:Requests per second: 10
  private _delayMs = 500

  static instance: Mainnetplorer | null
  /** get DB single instance */
  static getInstance(): Mainnetplorer | null {
    if (!Mainnetplorer.instance) {
      this.instance = new Mainnetplorer()
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

    const addressInfoApiUrl = `${this._url}/getAddressInfo/${addr}?apiKey=${this._apiKey}`
    const ret = await request<AddrInfoRes>({
      url: addressInfoApiUrl,
      method: 'GET',
    })

    if (ret.err && ret.err.error.message) throw new Error(ret.err.error.message)

    if (!ret.tokens || ret.tokens?.length === 0) return null

    const dateTime = ret.tokens[0].tokenInfo.price.ts
    const cur = ret.tokens[0].tokenInfo.price.currency
    const tokens: HToken[] = []
    let allAmount = 0
    ret.tokens.forEach((item) => {
      const price = Number(item.tokenInfo.price.rate)
      const balance =
        Number(item.rawBalance) / 10 ** Number(item.tokenInfo.decimals)
      const totalAmount = price * balance
      const token: HToken = {
        address: item.tokenInfo.address,
        symbol: item.tokenInfo.symbol,
        price: price,
        balance: balance,
        totalAmount: totalAmount,
      }
      tokens.push(token)
      allAmount += totalAmount
    })

    const holderTokens: HolderTokens = {
      totalAmount: allAmount,
      chainType: ChainEnum.Mainnet,
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
    const tokenInfoApiUrl = `${this._url}/getTokenInfo/${addr}?apiKey=${this._apiKey}`

    const ret = await request<{ holdersCount: number }>({
      url: tokenInfoApiUrl,
      method: 'GET',
    })
    holders = ret.holdersCount
    return holders
  }
}

export default Mainnetplorer
