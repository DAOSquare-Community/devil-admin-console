import { prop } from '@typegoose/typegoose'
import BaseModel from './BaseModel'
import TgooseHelper from 'lib/tgoosehelper'

// the collection name
const COLLECTION_NAME = 'user'

export class User extends BaseModel {
  @prop({ required: true, unique: true })
  public wallet_address!: string

  @prop({ default: null })
  public last_loginTime!: Date | null

  @prop({ default: '' })
  public session_token!: string

  @prop({ default: null })
  public session_expired!: Date | null

  @prop({ required: true, default: [] })
  public role!: string[]
}

// use TgooseHelper class , not Typegoose
export const UserModel = TgooseHelper.getModelForClass(User, COLLECTION_NAME)
