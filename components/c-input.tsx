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
  showLabel?: boolean
  showErrow?: boolean
  control: Control<T>
}

const CInput = <T extends FieldValues = FieldValues>({
  label,
  name,
  control,
  type = 'text',
  showLabel = true,
  showErrow = true,
  className,
  ...props
}: PropsWithChildren<CInputType<T>>) => {
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

export default CInput
