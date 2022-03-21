import { Member, MemberModel } from './../models/Member'
import BaseService from './base'

export default class MemberService extends BaseService<Member, typeof Member> {
  constructor() {
    super(MemberModel)
  }
}
