import React from 'react'

// eslint-disable-next-line react/display-name
const IndeterminateCheckbox = React.forwardRef<
  HTMLInputElement,
  { indeterminate?: boolean }
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
      className="form-checkbox"
      type="checkbox"
      {...rest}
    />
  )
})

export default IndeterminateCheckbox
