import React, { PropsWithChildren } from 'react'
import 'regenerator-runtime/runtime'
import Pagination from './pagination'
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useSortBy,
  usePagination,
  TableOptions,
  TableInstance,
  Row,
  useRowSelect,
} from 'react-table'
import { FilterBar, useGlobalMatchSorter } from './filter'
import { selectionHook } from './hooks'
import { ToolBar } from './toolbar'
import { TableHeader, TBody } from './table'
export interface TableProperties<T extends Record<string, unknown>>
  extends TableOptions<T> {
  name?: string
  onAdd?: (instance: TableInstance<T>) => void
  onDelete?: (instance: TableInstance<T>) => void
  onEdit?: (instance: TableInstance<T>) => void
  onClick?: (row: Row<T>) => void
  showSelection?: boolean
  isLoading?: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ComboTable<T extends Record<string, any>>(
  props: PropsWithChildren<TableProperties<T>>
) {
  // Use the state and functions returned from useTable to build your UI

  const globalFilter = useGlobalMatchSorter<T>()

  const {
    name,
    onAdd,
    onDelete,
    onEdit,
    onClick,
    showSelection = false,
    isLoading,
    ...others
  } = props
  // const [initialState, setInitialState] = useLocalStorage(
  //   `tableState:${name}`,
  //   {}
  // )
  const slectHooks = showSelection ? [useRowSelect, selectionHook] : []

  const hooks = [
    useFilters, // useFilters!
    useGlobalFilter,
    useSortBy,
    usePagination, // new
    ...slectHooks,
  ]
  const instance = useTable({ ...others, globalFilter }, ...hooks)
  // const { state } = instance
  // const debouncedState = useDebounce(state, 500)
  // useEffect(() => {
  //   const { sortBy, filters, pageSize, columnResizing, hiddenColumns } =
  //     debouncedState
  //   const val = {
  //     sortBy,
  //     filters,
  //     pageSize,
  //     columnResizing,
  //     hiddenColumns,
  //   }
  //   setInitialState(val)
  // }, [setInitialState, debouncedState])

  // Render the UI for your table
  const { getTableProps } = instance
  const { role, ...othertable } = getTableProps()
  return (
    <>
      <div className=" flex flex-1  flex-col-reverse sm:justify-end lg:flex-row lg:justify-between">
        <FilterBar {...instance} />
        {showSelection && (
          <ToolBar instance={instance} {...{ onAdd, onDelete, onEdit }} />
        )}
      </div>
      <div className="mt-4 flex flex-col overflow-x-auto">
        <table
          {...othertable}
          className={
            isLoading
              ? 'before:spinner table min-h-[200px] before:left-1/2 before:top-1/2'
              : ''
          }
        >
          <TableHeader {...instance} />
          <TBody {...instance} />
        </table>
      </div>
      <Pagination {...instance} />
    </>
  )
}

export default ComboTable
