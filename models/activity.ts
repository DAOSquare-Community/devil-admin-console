import { prop } from '@typegoose/typegoose'
import BaseModel from './BaseModel'
import TgooseHelper from 'lib/tgoosehelper'

// the collection name
const COLLECTION_NAME = 'activity'

export class Activity extends BaseModel {
  @prop({ required: true })
  public title!: string

  @prop({ required: true })
  public img!: string

  @prop({ required: true })
  public location!: string

  @prop({ required: false })
  public link!: string

  @prop({ default: true })
  public is_active!: boolean

  /** the operation time */
  @prop({ required: true, default: new Date() })
  public start_at!: Date
}

// use TgooseHelper class , not Typegoose
export const ActivityModel = TgooseHelper.getModelForClass(
  Activity,
  COLLECTION_NAME
)
