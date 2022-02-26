import { prop } from '@typegoose/typegoose'
import { Schema } from 'mongoose'
import BaseModel from './BaseModel'
import TgooseHelper from 'lib/tgoosehelper'

// the collection name
const COLLECTION_NAME = 'dao'

/** the contract of dao */
export class DAOContract {
  @prop({ required: true })
  public chain_type!: string

  @prop({ required: true })
  public contract_address!: string
}

/** OfficalLinks */
export class OfficalLinks {
  @prop({ required: true })
  public type!: string

  /** Social Type  link address */
  @prop({ required: true })
  public link_text!: string
}

/** the treasury info of dao */
export class Treasury {
  @prop({ required: true })
  public chain_type!: string

  /** the contract of dao's treasury */
  @prop({ required: true })
  public contract_address!: string

  /** get the json data of treasury url */
  @prop({ required: true })
  public json_url!: string
}

/** the contract of dao's token */
export class TokenContract {
  @prop({ required: true })
  public chain_type!: string

  /** the contract of dao's token */
  @prop({ required: true })
  public contract_address!: string
}

/** dao' token */
export class DAOToken {
  @prop({ required: true })
  public token_name!: string

  @prop({ required: true })
  public total_supply!: string

  @prop({ required: true })
  public token_contract!: TokenContract[]
}

/** the open api of dao */
export class OpenApi {
  dework?: { orgId: string }
  discord?: { channelId: string }
  twitter?: { twitterId: string }
  sesh?: { access_token: string; guild_id: string };
  [x: string]: unknown
}

export class Dao extends BaseModel {
  @prop({ required: true, unique: true })
  public daoId!: string

  @prop({ required: true })
  public name!: string

  @prop({ required: true })
  public logo!: string

  @prop({ required: true })
  public profile!: string

  @prop({ required: true })
  public category!: string

  @prop({ required: true, type: () => [String] })
  public founder!: string[]

  @prop({ required: true, type: Date })
  public start_time!: Date

  @prop({ required: true, type: () => [OfficalLinks], _id: false })
  public offical_links!: OfficalLinks[]

  @prop({ required: true, type: DAOContract, _id: false })
  public dao_contract!: DAOContract

  @prop({ required: true, type: Treasury, _id: false })
  public treasury!: Treasury

  @prop({ required: true, type: DAOToken, _id: false })
  public dao_token!: DAOToken

  @prop({ required: true, type: Schema.Types.Mixed, _id: false })
  public open_api!: object
}

// use TgooseHelper class , not Typegoose
export const DaoModel = TgooseHelper.getModelForClass(Dao, COLLECTION_NAME)
