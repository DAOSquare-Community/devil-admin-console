import Link from 'next/link'
import Image from 'next/image'
import { Box, Container, Button } from '@chakra-ui/react'
import logo from '../../../public/assets/images/logo.svg'
import './index.module.css'
import line from '../../../public/assets/images/line.svg'

import close from '../../../public/assets/images/close.svg'
import { useState } from 'react'
import './index.module.css'
import WalletModal from 'components/modal/wallet'
import useWalletSignIn from 'lib/utils/wallet'
import { useAxiosQuery } from 'lib/request/use-fetch'
import { MeInterface } from 'types/user'
import {
  EthereumAuthProvider,
  useViewerConnection,
  useViewerRecord,
} from '@self.id/framework'
import { signOut } from 'next-auth/react'
const AdminRoute = {
  name: 'Admin',
  path: '/admin',
}

const menuData = [
  {
    name: 'Daos',
    path: '/daos',
  },
  {
    name: 'People',
    path: '/daos/people',
  },
  {
    name: 'Add',
    path: '/daos/add',
  },
]

// function ConnectButton() {
//   const [connection, connect, disconnect] = useViewerConnection()
//   // ({connection.selfID.id})
//   console.log('connection', connection)

//   return connection.status === 'connected' ? (
//     <button
//       onClick={() => {
//         disconnect()
//       }}
//     >
//       Disconnect
//     </button>
//   ) : (
//     <button
//       disabled={connection.status === 'connecting'}
//       onClick={async () => {
//         const accounts = await window.ethereum.request({
//           method: 'eth_requestAccounts',
//         })
//         await connect(new EthereumAuthProvider(window.ethereum, accounts[0]))
//         console.log('connection', connection)
//       }}
//     >
//       Connect
//     </button>
//   )
// }

function Header() {
  const [isShowMenu, setIsShowMenu] = useState(false)

  const [curMenu, setCurMenu] = useState(-1)
  const [isOpen, setOpen] = useState(false)
  const { data, refetch } = useAxiosQuery<{ data: MeInterface }>(
    '/v2/user/me',
    {}
  )
  const [connection, connect, disconnect] = useViewerConnection()
  const record = useViewerRecord('basicProfile')

  const { connectWallet, deactivate } = useWalletSignIn(async (res) => {
    if (res) {
      setOpen(false)
      refetch()
      if (connection.status !== 'connected') {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        await connect(new EthereumAuthProvider(window.ethereum, accounts[0]))
      }
    }
  })

  const innerMenuData = [...menuData]

  const roles = data?.data?.roles
  const isAdmin = roles?.includes('admin') || roles?.includes('super-admin')
  if (isAdmin) {
    innerMenuData.push(AdminRoute)
  }
  return (
    <>
      <Box
        h={{ base: '80px', md: '120px' }}
        w="100%"
        pos="fixed"
        top={0}
        left={0}
        background="rgba(230, 235, 255, 0.6)"
        backdropFilter="blur(13px)"
        zIndex={999}
      >
        <Container
          maxW="container.xl"
          h="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Link href="/" passHref>
            <div>
              <Image
                src={logo}
                className={'w-[120px] cursor-pointer md:w-[200px]'}
                alt="logo"
              />
            </div>
          </Link>

          <div className="flex items-center  gap-5">
            <div className=" hidden items-center gap-5  md:flex">
              {innerMenuData.map((i) => (
                <Link href={i.path} key={i.name} passHref>
                  <button className="btn btn-ghost btn-sm font-medium capitalize text-ds-900">
                    {i.name}
                  </button>
                </Link>
              ))}
            </div>
            {/* {typeof window !== 'undefined' && <ConnectButton />} */}
            {connection.status !== 'connected' ? (
              <Button
                disabled={connection.status === 'connecting'}
                className=""
                onClick={() => {
                  setOpen(true)
                }}
              >
                Connect
              </Button>
            ) : (
              <Button
                onClick={() => {
                  signOut().then(() => {
                    deactivate()
                    disconnect()
                  })
                }}
              >
                {record?.content?.name} Disconnect
              </Button>
            )}
            <WalletModal
              isOpen={isOpen}
              setIsOpen={setOpen}
              onClick={(e) => {
                connectWallet(e)
              }}
            />
            <div className=" block md:hidden">
              <Image
                className={'w-5 cursor-pointer md:w-7'}
                src={line}
                alt="line"
                onClick={() => {
                  setIsShowMenu(!isShowMenu)
                }}
              />
            </div>
          </div>
        </Container>
      </Box>
      <Box
        className=" fixed inset-0 z-[999] flex h-screen flex-col justify-center bg-ds-content/80 backdrop-blur-xl"
        display={isShowMenu ? 'auto' : 'none'}
      >
        <Box
          pos="absolute"
          top={5}
          right={5}
          cursor="pointer"
          onClick={() => setIsShowMenu(false)}
        >
          <Image src={close} alt="close" />
        </Box>
        {innerMenuData.map((d, i) => (
          <Box
            key={i}
            className={curMenu === i ? 'menu-item active' : 'menu-item'}
            onMouseEnter={() => setCurMenu(i)}
            onMouseLeave={() => setCurMenu(-1)}
            onClick={() => {
              setIsShowMenu(false)
            }}
          >
            <Link href={d.path} passHref>
              <div className="text-shadow-sm text-center	text-5xl font-black leading-[96px] ">
                {d.name}
              </div>
            </Link>
          </Box>
        ))}
      </Box>
    </>
  )
}

export default Header
