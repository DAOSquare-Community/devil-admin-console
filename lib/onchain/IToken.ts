import { HolderTokens } from './holdertokens'

interface IToken {
  getHolderTokensByAddress(addr: string): Promise<HolderTokens | null>
}

export default IToken
