import { HolderTokens } from './holdertokens'

interface IToken {
  getHolderTokensByAddress(addr: string): Promise<HolderTokens | null>
  getHoldersCount(addr: string): Promise<number>
}

export default IToken
