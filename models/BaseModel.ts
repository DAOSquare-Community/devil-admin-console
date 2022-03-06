import { prop, pre } from '@typegoose/typegoose'
/**
 * the base of model
 *
 * @export
 * @class BaseModel
 */
// @pre<BaseModel>(['save'], function (next) {
//   if (!this.create_at) {
//     this.create_at = this.last_update_at = new Date()
//   } else {
//     this.last_update_at = new Date()
//   }
//   next()
// })
export default class BaseModel {
  _id?: string

  @prop({ required: true, default: new Date() })
  public create_at!: Date

  @prop({ required: true, default: new Date() })
  public last_update_at!: Date
}
