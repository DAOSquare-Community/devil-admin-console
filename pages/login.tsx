import { FC, useCallback, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Header from 'components/nav/header'
import { NextPageWithLayout } from 'types/page'
import { NoSlideMenuLayout } from 'components/nav/layout'
import React, { useState } from 'react'

// import enums
import { WalletEnum } from 'types/const-enum'
// import web3
import Web3 from 'web3'
import {
  useWeb3React,
  UnsupportedChainIdError,
  getWeb3ReactContext,
} from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

// next-auth
import { signIn, useSession } from 'next-auth/react'

//----------------connectors-----------------------
// import enum
import { ChainIdEnum } from 'types/const-enum'
import { request } from 'lib/request/axios-helper'
import { ResultMsg } from 'types/resultmsg'
import {
  CoinbaseIcon,
  ConnextSVG,
  FortmaticIcon,
  MatemaskSVG,
  TipIcon,
  WalletconnectIcon,
} from 'components/web3/icons'

const injected = new InjectedConnector({
  supportedChainIds: [ChainIdEnum.RINKEBY, ChainIdEnum.xDai],
})

const walletconnect = new WalletConnectConnector({
  rpc: {
    [ChainIdEnum.RINKEBY]:
      'https://rinkeby.infura.io/v3/6e11ac17a8df4ee0b292028cf4e17325',
    [ChainIdEnum.xDai]: 'https://rpc.gnosischain.com',
  },
  qrcode: true,
  //pollingInterval: 12000,
})

const connectors = {
  [WalletEnum.METAMASK]: injected,
  [WalletEnum.TRUSTWALLET]: walletconnect,
  [WalletEnum.WALLETCONNECT]: walletconnect,
}
//----------------connectors  end-----------------------

//------------------API_USERS-----------------------------
async function getNonce(publicAddress: string): Promise<ResultMsg<string>> {
  return await request({
    url: '/api/auth/nonce',
    method: 'get',
    payload: {
      publicAddress: publicAddress,
    },
  })
}
//------------------API_USERS  end-----------------------------

//------------------Web3Library-----------------------------
class Web3Library {
  // default : xdai web3
  static getLib(library: Web3) {
    if (library) return library
    else return new Web3('https://rpc.gnosischain.com')
  }
}
//------------------Web3Library  end-----------------------------

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

  //console.log('errors', errors)

  // Web3Connect------
  const { activate, account, library } = useWeb3React()
  const connectWallet = async (type: WalletEnum) => {
    await activate(connectors[type])
  }
  // Web3Login-----
  const { data: session, status } = useSession()

  const login = useCallback(
    async (address: string) => {
      //const addr = await web3.eth.getCoinbase()
      //console.log(`account----${account}`)
      const res = await getNonce(address)
      //console.log(res)
      if (res.message) return //console.log('Cannot retrive nonce')
      const nonce = res.data

      const textToSign = `Welcome to Devil, nonce:${nonce}`
      //console.log(`textToSign:${textToSign}`)

      const web3 = Web3Library.getLib(library)
      // MetaMask will ignore the password argument here
      const sign = await web3.eth.personal.sign(textToSign, address, '')
      //console.log(`sign:${sign}`)
      await signIn('credentials', {
        redirect: false,
        signature: sign,
        address: address,
      })

      router.push('/')
    },
    [library, router]
  )

  const firstRef = useRef(true)
  useEffect(() => {
    if (account && !firstRef.current) {
      login(account)
    }
    firstRef.current = false
  }, [account, login])

  // useEffect(() => {
  //   if (status === 'authenticated') {
  //     router.push('/')
  //   }
  // }, [router, status])

  return (
    <div className="mt-8 space-y-6">
      <a
        type="button"
        href="#wallet-moda"
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
      </a>
      <div style={{ margin: '50px' }}>
        <h3>Connected Infos</h3>
        {account
          ? `Connected Wallet: ${account}`
          : 'Connected Wallet: None'}{' '}
      </div>
      <div className="modal" id="wallet-moda">
        <div className="modal-box">
          <div className="flex items-center justify-between rounded-t border-b py-4 px-6 dark:border-gray-600">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white lg:text-xl">
              Connect wallet
            </h3>
            <a href="#" className="btn ">
              <ConnextSVG />
            </a>
          </div>
          <div className="p-6">
            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Connect with one of our available wallet providers or create a new
              one.
            </p>
            <ul className="my-4 space-y-3">
              <li>
                <a
                  href="#"
                  className="group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                  onClick={() => {
                    connectWallet(WalletEnum.METAMASK)
                  }}
                >
                  <MatemaskSVG />
                  <span className="ml-3 flex-1 whitespace-nowrap">
                    MetaMask
                  </span>
                  <span className="ml-3 inline-flex items-center justify-center rounded bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                    Popular
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                >
                  <CoinbaseIcon />
                  <span className="ml-3 flex-1 whitespace-nowrap">
                    Coinbase Wallet
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                  onClick={() => {
                    connectWallet(WalletEnum.WALLETCONNECT)
                  }}
                >
                  <WalletconnectIcon />
                  <span className="ml-3 flex-1 whitespace-nowrap">
                    WalletConnect
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
                >
                  <FortmaticIcon />
                  <span className="ml-3 flex-1 whitespace-nowrap">
                    Fortmatic
                  </span>
                </a>
              </li>
            </ul>
            <div>
              <a
                href="#"
                className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400"
              >
                <TipIcon />
                Why do I need to connect with my wallet?
              </a>
            </div>
          </div>
        </div>
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
