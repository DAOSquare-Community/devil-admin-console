import { prop } from '@typegoose/typegoose'
import BaseModel from './BaseModel'
import TgooseHelper from 'lib/tgoosehelper'

// the collection name
const COLLECTION_NAME = 'user'

export class User extends BaseModel {
  @prop({ required: true, unique: true })
  public wallet_address!: string

  @prop({ required: true })
  public last_loginTime!: string

  @prop({ required: true })
  public session_token!: string

  @prop({ required: true })
  public session_expired!: string

  @prop({ required: true })
  public role!: string[]
}

// use TgooseHelper class , not Typegoose
export const UserModel = TgooseHelper.getModelForClass(User, COLLECTION_NAME)
