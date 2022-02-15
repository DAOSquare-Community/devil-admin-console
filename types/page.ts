import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type PageName = '' | 'settings' | 'dashboard' | 'accounts'

export type { NextPageWithLayout, PageName }
