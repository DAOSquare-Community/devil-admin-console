import { FC } from 'react'
import ReactModal from 'react-modal'

export const Alert: FC<{
  isOpen: boolean
  onClose: () => void
  onClick: () => void
  message: string
}> = ({ isOpen, onClose, message, onClick }) => {
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
      <div className="relative inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 sm:mx-0 sm:h-10 sm:w-10">
              <i
                className="fa-regular fa-triangle-exclamation"
                style={{ height: 20 }}
              />
            </div>
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Warning
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">{message}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            className="btn btn-error text-white"
            onClick={onClick}
          >
            Continue
          </button>
          <button className="btn btn-ghost   " type="button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </ReactModal>
  )
}
