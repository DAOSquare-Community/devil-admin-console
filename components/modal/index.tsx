// TODO: Make this a general case modal.

import React, { FC } from 'react'
import ReactModal, { Props } from 'react-modal'
import classnames from 'classnames'

type ComstomModalProps = Props & {
  size?: 'small' | 'regular' | 'large'
  title: string
}

export const Modal: FC<ComstomModalProps & ModalFooterType> = ({
  isOpen,
  children,
  size = 'large',
  title,
  onClose,
  form,
  ...props
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      // appElement={document.getElementById('#root') as HTMLElement}
      ariaHideApp={false}
      overlayClassName="modal--overlay"
      className={classnames(
        'relative my-6 mx-auto w-auto max-w-sm  outline-none',
        { 'max-w-sm': size === 'small' },
        { 'max-w-3xl': size === 'regular' },
        { 'max-w-6xl': size === 'large' }
      )}
      {...props}
    >
      <ModalContainer title={title}>
        <ModalMain>{children}</ModalMain>
        <ModalFooter onClose={onClose} form={form} />
      </ModalContainer>
      {/* {children} */}
    </ReactModal>
  )
}

export const ModalMain: FC = ({ children }) => {
  return <div className="relative flex-auto p-6">{children}</div>
}

export type ModalFooterType = {
  onClose?: () => void
  onSumbimit?: () => void
  doneTitle?: string
  loading?: boolean
  form?: string
  type?: 'submit' | 'reset' | 'button' | undefined
}

export const ModalFooter: FC<ModalFooterType> = ({
  onClose,
  onSumbimit,
  doneTitle,
  loading = false,
  form,
  type,
}) => {
  return (
    <div className="border-blueGray-200 flex items-center justify-end rounded-b border-t border-solid p-6">
      <button
        className="btn btn-ghost  text-red-500 "
        type="button"
        onClick={onClose}
      >
        Close
      </button>
      <button
        className={classnames('btn btn-primary', { loading })}
        type={type ?? 'submit'}
        onClick={onSumbimit}
        form={form}
      >
        {doneTitle ?? 'Submit'}
      </button>
    </div>
  )
}

const ModalContainer: FC<{ title: string }> = ({ title, children }) => {
  return (
    <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
      <div className="border-blueGray-200 flex items-start justify-between rounded-t border-b border-solid p-5">
        <h3 className="text-3xl font-semibold">{title}</h3>
        {/* <button className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none">
            <span className="block h-6 w-6 bg-transparent text-2xl text-black opacity-5 outline-none focus:outline-none">
              ×
            </span>
          </button> */}
      </div>
      {children}
    </div>
  )
}

export const CModal: FC<ComstomModalProps & ModalFooterType> = ({
  children,
  isOpen,
  title,
  onSumbimit,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} title={title}>
      <ModalMain>{children}</ModalMain>
      <ModalFooter onClose={onClose} onSumbimit={onSumbimit} />
    </Modal>
  )
}

export default CModal
