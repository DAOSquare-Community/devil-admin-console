import { Activity, ActivityModel } from './../models/activity'
import BaseService from './base'

export default class ActivityService extends BaseService<
  Activity,
  typeof Activity
> {
  constructor() {
    super(ActivityModel)
  }
}
