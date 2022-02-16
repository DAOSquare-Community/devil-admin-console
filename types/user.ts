/** user */
export type User = {
  _id: string
  wallet_address: string
  last_loginTime: string
  session_token: string
  session_expired: string
  role: string[]
  create_at: Date
}
