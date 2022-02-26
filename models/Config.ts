import { prop } from '@typegoose/typegoose'
import { Schema } from 'mongoose'
import BaseModel from './BaseModel'
import TgooseHelper from 'lib/tgoosehelper'

// the collection name
const COLLECTION_NAME = 'config'

/** dao category */
export class DAOCategory {
  public code!: string
  public name!: string
  public logo!: string
}

/** Social Type */
export class SocialType {
  /** Social Type code */
  type!: string

  /** Social Type name */
  type_name!: string

  /** logo */
  logo!: string
}

export class Config extends BaseModel {
  @prop({ required: true, unique: true })
  public name!: string

  @prop({ required: true, type: Schema.Types.Mixed })
  public value!: object

  @prop({ required: true })
  public des!: string
}

//export const ConfigModel = getModelForClass(Config)
// use TgooseHelper class , not Typegoose
export const ConfigModel = TgooseHelper.getModelForClass(
  Config,
  COLLECTION_NAME
)
