import { prop } from '@typegoose/typegoose'
import BaseModel from './BaseModel'
import TgooseHelper from 'lib/tgoosehelper'

// the collection name
const COLLECTION_NAME = 'logop'

export class LogOp extends BaseModel {
  @prop({ required: true })
  public wallet_address!: string

  /** api path */
  @prop({ required: true })
  public path!: string

  /** the params */
  @prop({ default: '' })
  public params!: string

  /** result status 500/200/404 */
  @prop({ required: true, default: '200' })
  public status!: string

  /** the operation time */
  @prop({ required: true, default: new Date() })
  public optime!: Date
}

// use TgooseHelper class , not Typegoose
export const LogOpModel = TgooseHelper.getModelForClass(LogOp, COLLECTION_NAME)
