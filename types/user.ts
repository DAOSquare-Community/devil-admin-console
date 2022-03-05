import { Role } from './permission'

export interface MeInterface {
  avatar: string
  email: string
  joinDate: string
  name: string
  roles: Role[]
  title: string
  id: number
}

export type UserType = MeInterface
