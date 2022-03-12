import React from 'react'

// eslint-disable-next-line react/display-name
const IndeterminateCheckbox = React.forwardRef<
  HTMLInputElement,
  { indeterminate?: boolean } & React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
>(({ indeterminate, ...rest }, ref) => {
  const defaultRef = React.useRef<
    HTMLInputElement & { indeterminate?: boolean }
  >()
  const resolvedRef = (ref || defaultRef) as typeof defaultRef
  React.useEffect(() => {
    if (resolvedRef.current) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      resolvedRef.current.indeterminate = indeterminate
    }
  }, [resolvedRef, indeterminate])
  return (
    <input
      ref={resolvedRef as typeof ref}
      className="dmc-form-checkbox"
      type="checkbox"
      {...rest}
    />
  )
})

export default IndeterminateCheckbox
