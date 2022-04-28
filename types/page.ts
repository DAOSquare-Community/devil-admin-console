import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'

export type NextPageWithLayout<P = unknown> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type PermissionPageName = 'accounts'
export type MenuName =
  | 'dashboard'
  | 'accounts'
  | 'daos'
  | 'action-log'
  | 'members'
  | 'activity'

export type PagenationType = {
  page: number
  pageSize: number
  filters?: { id: string; value?: string | { from: string; to: string } }[]
  sortBy?: { id: string; desc?: boolean }[]
}

export type PagenationObjectType = {
  page: number
  pageSize: number
  filters?: Record<
    string,
    { $regex: string; $options: string } | { $gte?: Date; $lte?: Date }
  >
  sortBy?: Record<string, 'desc' | 'asc'>
}
