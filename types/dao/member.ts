import { SocialType } from 'types/socialtype'

/** Member */
export type Member = {
  _id: string
  name: string
  gender: string
  /** Member Profile */
  profile: string
  is_famous: boolean
  is_hot: boolean
  wallet_address: string
  /** belong to daos */
  daos: string[]
  social_links: SocialType[]
  create_at: Date
  last_update_at: Date
}
