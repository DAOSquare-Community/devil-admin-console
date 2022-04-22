import classnames from 'classnames'
import {
  ConnextSVG,
  MatemaskSVG,
  TipIcon,
  WalletconnectIcon,
} from 'components/web3/icons'
import { FC } from 'react'
import ReactModal from 'react-modal'
import { WalletEnum } from 'types/const-enum'

const WalletItems = [
  {
    name: 'MetaMask',
    isPopular: true,
    svg: <MatemaskSVG />,
    walletType: WalletEnum.METAMASK,
  },
  // {
  //   name: 'Coinbase Wallet',
  //   svg: <CoinbaseIcon />,
  //   walletType: WalletEnum.METAMASK,
  // },
  {
    name: 'WalletConnect',
    svg: <WalletconnectIcon />,
    walletType: WalletEnum.WALLETCONNECT,
  },
  // {
  //   name: 'Fortmatic',
  //   svg: <FortmaticIcon />,
  // },
]

type WalletItemProps = {
  onClick: (e: WalletEnum) => void
  name: string
  isPopular?: boolean
  svg: JSX.Element
  walletType: WalletEnum
}

const WalletItem: FC<WalletItemProps> = ({
  onClick,
  name,
  isPopular,
  svg,
  walletType,
}) => {
  return (
    <li>
      <a
        className="group flex items-center rounded-lg bg-gray-50 p-3 text-base font-bold text-gray-900 hover:bg-gray-100 hover:shadow dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500"
        onClick={() => {
          onClick(walletType)
        }}
      >
        {svg}
        <span className="ml-3 flex-1 whitespace-nowrap">{name}</span>
        {isPopular && (
          <span className="ml-3 inline-flex items-center justify-center rounded bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-400">
            Popular
          </span>
        )}
      </a>
    </li>
  )
}

const WalletModal: FC<{
  onClick: (e: WalletEnum) => void
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}> = ({ onClick, isOpen, setIsOpen }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      closeTimeoutMS={300}
      ariaHideApp={false}
      overlayClassName="modal--overlay"
      className={classnames(
        'relative my-6 mx-auto w-auto min-w-[400px] max-w-sm outline-none'
      )}
      // {...props}
    >
      <div className="modal-box">
        <div className="flex items-center justify-between rounded-t   px-6 ">
          <h3 className="text-base font-semibold text-gray-900  lg:text-xl">
            Connect wallet
          </h3>
          <button
            onClick={() => {
              setIsOpen(false)
            }}
            className="btn btn-ghost btn-circle"
          >
            <ConnextSVG />
          </button>
        </div>
        <div className="p-6">
          <p className="text-sm font-normal text-gray-500 ">
            Connect with one of our available wallet providers or create a new
            one.
          </p>

          <ul className="my-4 space-y-3">
            {WalletItems.map((item) => {
              return <WalletItem key={item.name} {...item} onClick={onClick} />
            })}
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
    </ReactModal>
  )
}

export default WalletModal
