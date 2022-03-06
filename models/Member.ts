import { prop } from '@typegoose/typegoose'
import BaseModel from './BaseModel'
import TgooseHelper from 'lib/tgoosehelper'

// the collection name
const COLLECTION_NAME = 'member'

/** SocialLinks */
export class SocialLinks {
  @prop({ required: true })
  public type!: string

  /** Social Type  link address */
  @prop({ required: true })
  public link_text!: string
}

/** Member */
export class Member extends BaseModel {
  @prop({ required: true })
  public name!: string

  @prop({ required: true })
  public gender!: string

  /** Member Profile */
  @prop({ required: true })
  public profile!: string

  @prop({ required: true })
  public is_famous!: boolean

  @prop({ required: true })
  public is_hot!: boolean

  @prop({ required: true, unique: true })
  public wallet_address!: string

  /** belong to daos */
  @prop({ required: true })
  public daos!: string[]

  @prop({ required: true, type: () => [SocialLinks], _id: false })
  public social_links!: SocialLinks[]
}

// use TgooseHelper class , not Typegoose
export const MemberModel = TgooseHelper.getModelForClass(
  Member,
  COLLECTION_NAME
)
