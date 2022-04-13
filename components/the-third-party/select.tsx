import React from 'react'

import Select, { components, Props } from 'react-select'
import styles from 'styles/react-select.module.css'
export const SelectContainer: typeof components.SelectContainer = ({
  isFocused,
  className,
  ...other
}) => {
  return (
    <components.SelectContainer
      {...other}
      isFocused={isFocused}
      className={
        isFocused
          ? `${styles['dmc-form-select-child-focus']}  !text-inherit `
          : className
      }
    />
  )
}

export const Option: typeof components.Option = (props) => {
  return (
    <components.Option
      {...props}
      className={`   !active:bg-base-300  !hover:bg-base-200   !text-base-content ${
        props.isFocused ? '!bg-base-200 ' : '!bg-base'
      }`}
    />
  )
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RSelect = React.forwardRef<any, Props<{ label: string; value: any }>>(
  (props, ref) => {
    return (
      <Select
        ref={ref}
        components={{ SelectContainer, Option }}
        styles={{ singleValue: (base) => ({ ...base, color: undefined }) }}
        {...props}
      />
    )
  }
)

RSelect.displayName = 'RSelect'

export default RSelect
