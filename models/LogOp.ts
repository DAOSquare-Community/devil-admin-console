import { prop } from '@typegoose/typegoose'
import BaseModel from './BaseModel'
import TgooseHelper from 'lib/tgoosehelper'

// the collection name
const COLLECTION_NAME = 'logop'

export class LogOp extends BaseModel {
  @prop({ required: true, unique: true })
  public wallet_address!: string

  /** api path */
  @prop({ required: true })
  public path!: string

  /** result status 500/200/404 */
  @prop({ required: true })
  public status!: string

  /** the operation time */
  @prop({ required: true })
  public optime!: Date
}

// use TgooseHelper class , not Typegoose
export const LogOpModel = TgooseHelper.getModelForClass(LogOp, COLLECTION_NAME)
