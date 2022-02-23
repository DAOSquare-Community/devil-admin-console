import { CellProps, HeaderProps, Hooks } from 'react-table'
import IndeterminateCheckbox from './check'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const selectionHook = (hooks: Hooks<any>) => {
  hooks.allColumns.push((columns) => [
    // Let's make a column for selection
    {
      id: 'selection',
      disableResizing: true,
      disableGroupBy: true,
      minWidth: 45,
      width: 45,
      maxWidth: 45,
      Aggregated: undefined,
      // The header can use the table's getToggleAllRowsSelectedProps method
      // to render a checkbox
      Header: ({
        getToggleAllRowsSelectedProps,
      }: HeaderProps<Record<string, unknown>>) => (
        <IndeterminateCheckbox
          className="form-checkbox"
          {...getToggleAllRowsSelectedProps()}
        />
      ),
      // The cell can use the individual row's getToggleRowSelectedProps method
      // to the render a checkbox
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Cell: ({ row }: CellProps<Record<string, unknown>>) => (
        <IndeterminateCheckbox
          className="form-checkbox"
          {...row.getToggleRowSelectedProps()}
        />
      ),
    },
    ...columns,
  ])
  hooks.useInstanceBeforeDimensions.push(({ headerGroups }) => {
    // fix the parent group of the selection button to not be resizable
    const selectionGroupHeader = headerGroups[0].headers[0]
    selectionGroupHeader.canResize = false
  })
}
