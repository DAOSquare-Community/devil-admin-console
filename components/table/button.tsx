import React, { ButtonHTMLAttributes, FC } from 'react'

export const Button: FC<ButtonHTMLAttributes<never>> = ({
  children,
  ...rest
}) => {
  return (
    <button
      type="button"
      className={
        'relative inline-flex items-center rounded-md border' +
        'border-base-300  px-4 py-2 text-sm font-medium  hover:bg-base-200'
      }
      {...rest}
    >
      {children}
    </button>
  )
}

export const PageButton: FC<ButtonHTMLAttributes<never>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <button
      type="button"
      className={`relative inline-flex items-center border border-base-300  px-2 py-2 text-sm font-medium  hover:bg-base-200 ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
