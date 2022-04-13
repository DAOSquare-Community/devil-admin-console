// TODO: Make this a general case modal.

import React, { FC, HTMLAttributes } from 'react'
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
  loading,
  onClose,
  form,
  ...props
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      closeTimeoutMS={300}
      ariaHideApp={false}
      overlayClassName="modal--overlay"
      className={classnames(
        'relative my-6 mx-auto w-auto min-w-[400px] max-w-sm outline-none',
        { 'min-w-sm': size === 'small' },
        { 'min-w-3xl': size === 'regular' },
        { 'min-w-6xl': size === 'large' }
      )}
      {...props}
    >
      <ModalContainer
        className={classnames(' duration-300  ', {
          'animate-in fade-in slide-in-from-bottom-20': isOpen,
          'animate-out fade-out slide-out-to-bottom-20': !isOpen,
        })}
        title={title}
      >
        <ModalMain>{children}</ModalMain>
        <ModalFooter onClose={onClose} form={form} loading={loading} />
      </ModalContainer>
      {/* {children} */}
    </ReactModal>
  )
}

export const ModalMain: FC = ({ children }) => {
  return <div className="relative flex-auto p-6 ">{children}</div>
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
    <div className="rounde flex items-center justify-end  bg-base-200 px-4 py-3 sm:px-6">
      <button className="btn btn-ghost mr-2 " type="button" onClick={onClose}>
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

const ModalContainer: FC<
  { title: string } & HTMLAttributes<HTMLDivElement>
> = ({ title, children, className }) => {
  return (
    <div
      className={`relative flex w-full flex-col rounded-lg border-0 bg-base-100 shadow-lg outline-none  focus:outline-none ${className}`}
    >
      <div className=" flex items-start justify-between rounded-t  p-5">
        <h3 className="text-3xl font-semibold">{title}</h3>
      </div>
      {children}
    </div>
  )
}
