import {
  DetailedHTMLProps,
  PropsWithChildren,
  SelectHTMLAttributes,
} from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import classNames from 'classnames'
type CSelectType<T extends FieldValues> = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {
  name: Path<T>
  label?: string
  showLabel?: boolean
  showErrow?: boolean
  control: Control<T>
}

const CSelect = <T extends FieldValues = FieldValues>({
  label,
  name,
  control,
  showLabel = true,
  showErrow = true,
  className,
  children,
  ...props
}: PropsWithChildren<CSelectType<T>>) => {
  return (
    <>
      {showLabel && (
        <label
          className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
          htmlFor={name}
        >
          {label ?? name}
        </label>
      )}
      <Controller<T, Path<T>>
        name={name}
        control={control}
        // defaultValue={props.defaultValue}
        render={({ field, fieldState: { error } }) => {
          return (
            <>
              <select
                className={classNames('dmc-form-select', className, {
                  'border-red-500': error?.message,
                })}
                id={name}
                {...field}
                {...props}
              >
                {children}
              </select>
              {showErrow && !!error?.message && (
                <p className="mt-2 text-xs italic text-red-500">
                  {error?.message}
                </p>
              )}
            </>
          )
        }}
      />
    </>
  )
}

export default CSelect
