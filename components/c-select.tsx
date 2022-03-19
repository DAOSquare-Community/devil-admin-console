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
              <Select
                className={classNames('dmc-form-select', className, {
                  'border-red-500': error?.message,
                })}
                // styles={{ input: { textAlign: 'center' } }}
                id={name}
                {...field}
                {...props}
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

export default CSelect
