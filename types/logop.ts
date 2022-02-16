/** logop */
export type LogOp = {
  _id: string
  wallet_address: string
  /** api path */
  path: string
  /** result status 500/200/404 */
  status: string
  /** the operation time */
  optime: Date
}
