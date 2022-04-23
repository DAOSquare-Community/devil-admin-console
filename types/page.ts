import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'

export type NextPageWithLayout<P = unknown> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type PermissionPageName = 'accounts'
export type MenuName = 'dashboard' | 'accounts' | 'daos' | 'action-log'

export type PagenationType = {
  page: number
  pageSize: number
  filters?: { id: string; value?: string }[]
  sortBy?: { id: string; desc?: boolean }[]
}
