import { FC } from 'react'
import ReactModal from 'react-modal'

export type AlertType = {
  isOpen?: boolean
  onClose: () => void
  onClick: () => void
  message: string
}

export const AlertModal: FC<AlertType> = ({
  isOpen = false,
  onClose,
  message,
  onClick,
}) => {
  return (
    <ReactModal
      ariaHideApp={false}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      onRequestClose={onClose}
      overlayClassName="modal--overlay"
      className={'relative my-6 mx-auto w-auto max-w-sm  outline-none'}
      isOpen={isOpen}
    >
      <div className="relative inline-block transform overflow-hidden rounded-lg bg-base-100 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
        <div className=" px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 sm:mx-0 sm:h-10 sm:w-10">
              {/* <FontAwesomeIcon
                icon={['far', 'triangle-exclamation']}
                className={'h-[20px] w-[20px]'}
              /> */}
            </div>
            <div className="mt-3 text-center  sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg font-medium leading-6  text-base-content">
                Warning
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">{message}</p>
              </div>
            </div>
          </div>
        </div>
        <div className=" bg-base-200 px-4 py-3 sm:flex sm:flex-row-reverse  sm:px-6">
          <button
            type="button"
            className="btn btn-error text-white"
            onClick={onClick}
          >
            Continue
          </button>
          <button
            className="btn btn-ghost  mr-2 "
            type="button"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </ReactModal>
  )
}
