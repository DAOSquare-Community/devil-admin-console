import { Role } from './permission'

export interface MeInterface {
  avatar: string
  email: string
  joinDate: string
  name: string
  roles: Role[]
  slackId?: string
  title: string
}

export type UserType = MeInterface
