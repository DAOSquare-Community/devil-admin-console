type HolderTokens = {
  totalAmount: number
  chainType: string
  tokens: HToken[]
  ts: number
  currency: string
}

type HToken = {
  address: string
  symbol: string
  price: number
  balance: number
  totalAmount: number
}
export type { HolderTokens, HToken }
