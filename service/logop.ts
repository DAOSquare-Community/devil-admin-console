import { LogOp, LogOpModel } from './../models/LogOp'
import BaseService from './base'

export default class LogOpService extends BaseService<LogOp, typeof LogOp> {
  constructor() {
    super(LogOpModel)
  }
}
