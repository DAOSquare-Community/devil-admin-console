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

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps, router }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  const { pathname } = router
  return (
    <QueryClientProvider client={queryClient}>
      <SignCheckLayout pathname={pathname} dontSignPathList={DontSignPathList}>
        {getLayout(<Component {...pageProps} />)}
      </SignCheckLayout>
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastContainer />
    </QueryClientProvider>
  )
}

export default MyApp
