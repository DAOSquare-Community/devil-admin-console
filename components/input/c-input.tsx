import {
  DetailedHTMLProps,
  PropsWithChildren,
  InputHTMLAttributes,
} from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import classNames from 'classnames'
type CInputType<T extends FieldValues> = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  name: Path<T>
  label?: string
  disableLabel?: boolean
  disbaleError?: boolean
  control: Control<T>
  labelClassName?: string
}

const CInput = <T extends FieldValues = FieldValues>({
  label,
  name,
  control,
  type = 'text',
  disableLabel = false,
  disbaleError = false,
  className,
  labelClassName,
  ...props
}: PropsWithChildren<CInputType<T>>) => {
  return (
    <>
      {!disableLabel && (
        <label
          className={`dmc-label mb-2 ${labelClassName ? labelClassName : ''}`}
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
              <input
                className={classNames('dmc-form-input', className, {
                  'border-red-500': error?.message,
                })}
                id={name}
                type={type}
                {...field}
                {...props}
                value={field.value ?? ''}
              />
              {!disbaleError && !!error?.message && (
                <p className="mt-2 text-xs lowercase italic text-red-500 first-letter:uppercase">
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

export default CInput
