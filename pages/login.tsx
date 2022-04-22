import { FC, useState } from 'react'
import { useRouter } from 'next/router'
import Header from 'components/admin-nav/header'
import { NextPageWithLayout } from 'types/page'
import { NoSlideMenuLayout } from 'components/admin-nav/layout'
import React from 'react'

import WalletModal from 'components/modal/wallet'
import useWalletSignIn from 'lib/utils/wallet'

const LoginContainer: FC = ({ children }) => {
  return (
    <>
      <div className="flex min-h-full w-full items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <div className="flex items-center justify-center">
              {/* <Image
                width={100}
                height={50}
                priority
                className="mx-auto h-12 w-auto"
                src={logoAddress}
                alt="logo"
              /> */}
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

//------------------LoginForm-----------------------------
const LoginMain: FC = () => {
  // const { isValidating, trigger } = useLoginApi()
  const router = useRouter()
  const [isOpen, setOpen] = useState(false)

  const { connectWallet, account } = useWalletSignIn((res) => {
    !!res && router.push('/admin')
  })

  return (
    <div className="mt-8">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn inline-flex items-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <svg
          className="mr-2 h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
        CONNECT WALLET
      </button>
      <WalletModal
        onClick={(e) => {
          connectWallet(e)
        }}
        isOpen={isOpen}
        setIsOpen={setOpen}
      />
      <div>
        <h3>Connected Infos</h3>
        {account ? `Connected Wallet: ${account}` : 'Connected Wallet: None'}
      </div>
    </div>
  )
}

const Login: NextPageWithLayout = () => {
  return (
    <LoginContainer>
      <Header />
      <LoginMain />
    </LoginContainer>
  )
}
Login.getLayout = (page) => <NoSlideMenuLayout>{page}</NoSlideMenuLayout>

export default Login
