import { PropsWithChildren } from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import classNames from 'classnames'
import Select, { Props } from 'react-select'
type CSelectType<T extends FieldValues> = Props<{
  label: string
  value: string
}> & {
  name: Path<T>
  label?: string
  disableLabel?: boolean
  disbaleError?: boolean
  control: Control<T>
  labelClassName?: string
}

const CSelect = <T extends FieldValues = FieldValues>({
  label,
  name,
  control,
  disableLabel = false,
  disbaleError = false,
  className,
  labelClassName,
  ...props
}: PropsWithChildren<CSelectType<T>>) => {
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
              <Select
                className={classNames('dmc-form-select', className, {
                  'border-red-500': error?.message,
                })}
                // styles={{ input: { textAlign: 'center' } }}
                id={name}
                {...field}
                {...props}
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

export default CSelect
