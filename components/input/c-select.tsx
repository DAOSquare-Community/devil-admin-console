import { PropsWithChildren } from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import classNames from 'classnames'
import { Props, PropsValue } from 'react-select'
import RSelect from 'components/the-third-party/select'

type UnkonwnValue = { value: unknown }

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
              <RSelect
                className={classNames('dmc-react-select', className, {
                  'dmc-form-select-child-error rounded-btn border-[1px] border-red-500':
                    error?.message,
                })}
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

export const EZSelect = <T extends FieldValues = FieldValues>({
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
          const option = props.options
          const value = !props.isMulti
            ? option?.filter((v) => (v as UnkonwnValue).value === field.value)
            : option?.filter((v) =>
                field.value.includes((v as UnkonwnValue).value)
              )
          return (
            <>
              <RSelect
                className={classNames('dmc-react-select', className, {
                  'dmc-form-select-child-error rounded-btn border-[1px] border-red-500':
                    error?.message,
                })}
                id={name}
                {...field}
                {...props}
                value={
                  value as PropsValue<{
                    label: string
                    value: unknown
                  }>
                }
                // value={props.options?.filter((i) => i.value === field.value)}
                onChange={(e) => {
                  // const d = e as {value}
                  if (Array.isArray(e)) {
                    field.onChange(e.map((l) => l.value))
                  } else if ((e as UnkonwnValue).value) {
                    field.onChange((e as UnkonwnValue).value)
                  } else {
                    field.onChange(e)
                  }
                }}
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
