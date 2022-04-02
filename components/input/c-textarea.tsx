import {
  DetailedHTMLProps,
  PropsWithChildren,
  InputHTMLAttributes,
} from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import classNames from 'classnames'
// import { Input } from '@hireteammate/hiretual-design'
type CInputType<T extends FieldValues> = DetailedHTMLProps<
  InputHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  name: Path<T>
  label?: string
  disableLabel?: boolean
  disbaleError?: boolean
  control: Control<T>
  labelClassName?: string
}

const CTextarea = <T extends FieldValues = FieldValues>({
  label,
  name,
  control,
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
              <textarea
                className={classNames(
                  'dmc-form-input min-h-[100px] py-2',
                  className,
                  {
                    'border-red-500': error?.message,
                  }
                )}
                id={name}
                {...field}
                {...props}
                value={field.value || ''}
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

export default CTextarea
