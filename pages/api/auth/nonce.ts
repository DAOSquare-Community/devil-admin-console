import {
  Get,
  createHandler,
  BadRequestException,
  Query,
} from '@storyofams/next-api-decorators'
import { UserNonceCache } from 'lib/config'
import Web3Auth from 'lib/web3Auth'
import { ResultMsg } from 'types/resultmsg'
import Web3 from 'web3'

class AuthController {
  /**
   * get the user's nonce
   * @param walletAddress
   * @returns
   */
  @Get()
  public async getUserNonce(
    @Query('publicAddress') walletAddress: string
  ): Promise<ResultMsg<string>> {
    const res: ResultMsg<string> = {
      message: '',
    }
    //console.log(`walletAddress:${walletAddress}`)
    if (!Web3.utils.isAddress(walletAddress))
      throw new BadRequestException('invalid address')

    let nonce = UserNonceCache.get(walletAddress)
    if (!nonce) {
      nonce = Web3Auth.getNonce()
      UserNonceCache.put(walletAddress, nonce)
    }
    res.data = nonce
    //console.log(`UserNonceCache:${JSON.stringify(UserNonceCache)}`)
    //console.log(`UserNonceCache.get:${UserNonceCache.get(walletAddress)}`)
    return res
  }
}
export default createHandler(AuthController)
