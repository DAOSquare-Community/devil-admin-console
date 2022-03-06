import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

export type PermissionPageName = 'accounts'
export type MenuName = 'dashboard' | 'accounts' | 'daos'
