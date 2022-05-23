import { useWeb3React } from '@web3-react/core'

import { RedirectableProviderType } from 'next-auth/providers'
import { ChainIdEnum } from 'types/const-enum'
import { WalletEnum } from 'types/const-enum'
// import web3
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import Web3 from 'web3'
// next-auth

//----------------connectors-----------------------
// import enum

import { request } from 'lib/request/axios-helper'
import { ResultMsg } from 'types/resultmsg'
import { useCallback, useEffect, useRef } from 'react'
import { signIn, SignInResponse } from 'next-auth/react'

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

const useWalletSignIn = (after?: (res?: SignInResponse) => void) => {
  const { activate, account, library, deactivate } = useWeb3React<Web3>()
  const connectWallet = async (type: WalletEnum) => {
    await activate(connectors[type])
  }
  const auth = useCallback(
    async (address: string) => {
      //const addr = await web3.eth.getCoinbase()
      //console.log(`account----${account}`)
      const res = await getNonce(address)
      //console.log(res)
      if (res.message) return //console.log('Cannot retrive nonce')
      const nonce = res.data

      const textToSign = `Welcome to Devil, nonce:${nonce}`
      //console.log(`textToSign:${textToSign}`)

      const web3 = library ?? new Web3('https://rpc.gnosischain.com')
      // MetaMask will ignore the password argument here
      const sign = await web3.eth.personal.sign(textToSign, address, '')
      //console.log(`sign:${sign}`)
      return signIn<RedirectableProviderType>('credentials', {
        redirect: false,
        signature: sign,
        address: address,
      })
    },
    [library]
  )

  const firstRef = useRef(true)
  const afterRef = useRef(after)
  useEffect(() => {
    if (account && !firstRef.current) {
      auth(account).then(afterRef.current)
    }
    firstRef.current = false
  }, [account, auth])

  return { auth, connectWallet, account, deactivate }
}

export default useWalletSignIn
