import '../styles/globals.css'
import type { AppProps } from 'next/app'
import type { NextPageWithLayout } from 'types/page'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import queryClient from 'lib/request/query-client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import SignCheckLayout from 'components/auth'
import { DontSignPathList } from 'lib/config'

// import web3
import Web3 from 'web3'
import { Web3ReactProvider } from '@web3-react/core'

import { SessionProvider } from 'next-auth/react'
import { provider } from 'web3-core'
import AlertComponent from 'components/modal/cmd-alert'
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

// intialize web3-react
const getLibrary = (provider: provider) => {
  return new Web3(provider)
}

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
  router,
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  const { pathname } = router
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <SessionProvider session={session}>
        <QueryClientProvider client={queryClient}>
          <SignCheckLayout
            pathname={pathname}
            dontSignPathList={DontSignPathList}
          >
            {getLayout(<Component {...pageProps} />)}
          </SignCheckLayout>
          <ReactQueryDevtools initialIsOpen={false} />
          <ToastContainer />
          <AlertComponent />
        </QueryClientProvider>
      </SessionProvider>
    </Web3ReactProvider>
  )
}

export default MyApp
