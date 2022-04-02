import {
  Control,
  FieldPath,
  FieldPathValue,
  FieldValues,
  PathValue,
  useWatch,
} from 'react-hook-form'

const WatchComponent = <
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  defaultValue,
  render,
  ...other
}: {
  name: TFieldName
  defaultValue?: FieldPathValue<TFieldValues, TFieldName>
  control?: Control<TFieldValues>
  disabled?: boolean
  exact?: boolean
  render?: (props: {
    value: PathValue<TFieldValues, TFieldName>
    defaultValue?: FieldPathValue<TFieldValues, TFieldName>
    control?: Control<TFieldValues>
    disabled?: boolean
    exact?: boolean
  }) => JSX.Element | null
}) => {
  const value = useWatch({
    control,
    name,
    defaultValue, // default value before the render
  })
  if (render) {
    return render({ value, defaultValue, ...other })
  }
  return null
}

export default WatchComponent
