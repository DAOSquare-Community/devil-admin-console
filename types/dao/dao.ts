import { SocialType } from 'types/socialtype'

/** DAO 实体 */
export interface LogOp {
  _id: string
  daoId: string
  /** dao name */
  name: string
  /** logo address */
  logo: string
  /** DAO's Profile */
  profile: string
  /** DAO's Category*/
  category: string
  /** DAO's founder  Member._id */
  founder: string[]
  /** DAO Start date */
  start_time: Date
  offical_links: SocialType[]
  dao_contract: DAOContract
  treasury: Treasury
  dao_token: DAOToken
  open_api: {
    dework?: { orgId: string }
    discord?: { channelId: string }
    sesh?: { access_token: string; guild_id: string }
    [x: string]: unknown
  }
  create_at: Date
  last_update_at: Date
}

/** the contract of dao */
type DAOContract = {
  chain_type: string
  contract_address: string
}

/** the treasury info of dao */
type Treasury = {
  chain_type: string
  /** the contract of dao's treasury */
  contract_address: string
}

/** dao' token */
type DAOToken = {
  token_name: string
  total_supply: string
  token_contract: TokenContract[]
}

/** the contract of dao's token */
type TokenContract = {
  chain_type: string
  /** the contract of dao's token */
  contract_address: string
}
