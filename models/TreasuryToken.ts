import { index, prop } from '@typegoose/typegoose'
import BaseModel from './BaseModel'
import TgooseHelper from 'lib/tgoosehelper'

// the collection name
const COLLECTION_NAME = 'treasurytoken'

export class Token {
  @prop({ required: true })
  public address!: string

  @prop({ required: true })
  public symbol!: string

  @prop({ required: true, default: 0 })
  public price!: number

  @prop({ required: true, default: 0 })
  public balance!: number

  @prop({ required: true, default: 0 })
  public totalAmount!: number
}

/**
 * Treasury
 */
@index({ daoId: 1, treasury_address: 1, ts: -1 }, { unique: true }) // compound index
export class TreasuryToken extends BaseModel {
  @prop({ required: true, index: true })
  public daoId!: string

  @prop({ required: true, index: true })
  public treasury_address!: string

  @prop({ required: true, default: 0 })
  public total_amount!: number

  @prop({ required: true, default: '' })
  public chainType!: string

  @prop({ type: () => [Token], _id: false })
  public tokens!: Token[]

  @prop({ required: true, index: true })
  public ts!: Date

  @prop({ required: true, default: 'USD' })
  public currency!: string
}

// use TgooseHelper class , not Typegoose
export const TreasuryTokenModel = TgooseHelper.getModelForClass(
  TreasuryToken,
  COLLECTION_NAME
)
