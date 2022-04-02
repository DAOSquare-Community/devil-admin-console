import '../styles/globals.css'
import type { AppProps } from 'next/app'
import type { NextPageWithLayout } from 'types/page'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import queryClient from 'lib/request/query-client'
import SignCheckLayout from 'components/auth'
import theme from '../components/theme'
// import web3
import Web3 from 'web3'
import { Web3ReactProvider } from '@web3-react/core'

import { SessionProvider } from 'next-auth/react'
import { provider } from 'web3-core'
import AlertComponent from 'components/modal/cmd-alert'
import { ChakraProvider } from '@chakra-ui/react'
import CToaster from 'components/toast'
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
    <ChakraProvider theme={theme}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <SessionProvider session={session}>
          <QueryClientProvider client={queryClient}>
            <SignCheckLayout pathname={pathname}>
              {getLayout(<Component {...pageProps} />)}
            </SignCheckLayout>
            <ReactQueryDevtools initialIsOpen={false} />
            <AlertComponent />
            <CToaster />
          </QueryClientProvider>
        </SessionProvider>
      </Web3ReactProvider>
    </ChakraProvider>
  )
}

export default MyApp
