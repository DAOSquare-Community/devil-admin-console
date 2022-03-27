import React, { PropsWithChildren, useEffect, useRef } from 'react'
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
  TableState,
} from 'react-table'
import { FilterBar, useGlobalMatchSorter } from './filter'
import { TableHeader, TBody } from './table'
import { selectionHook } from './hooks'
import { ToolBar } from './toolbar'
import { useDebounce, useLocalStorage } from 'lib/utils'
import ColumnHidePage from './column-hide-page'
// import { useDebounce, useLocalStorage } from 'lib/utils'

export interface TableProperties<T extends Record<string, unknown>>
  extends TableOptions<T> {
  name?: string
  onAdd?: (instance: TableInstance<T>) => void
  onDelete?: (instance: TableInstance<T>) => void
  onEdit?: (instance: TableInstance<T>) => void
  onClick?: (row: Row<T>) => void
  disableSelection?: boolean
  isLoading?: boolean
  onStateChange?: (state: TableState<T>) => void
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
    onStateChange,
    disableSelection = true,
    isLoading,
    disableGlobalFilter,
    ...others
  } = props
  const [initialState, setInitialState] = useLocalStorage(
    `tableState:${name}`,
    {}
  )
  const slectHooks = !disableSelection ? [useRowSelect, selectionHook] : []
  const hooks = [
    useFilters, // useFilters!
    useGlobalFilter,
    useSortBy,
    usePagination, // new
    ...slectHooks,
  ]
  const instance = useTable(
    { ...others, globalFilter, initialState, disableGlobalFilter },
    ...hooks
  )
  const { state, getTableProps } = instance
  const debouncedState = useDebounce(state, 500)
  useEffect(() => {
    const { sortBy, filters, pageSize, columnResizing, hiddenColumns } =
      debouncedState
    const val = {
      sortBy,
      filters,
      pageSize,
      columnResizing,
      hiddenColumns,
    }
    setInitialState(val)
  }, [setInitialState, debouncedState])

  const onStateChangeRef = useRef(onStateChange)
  onStateChangeRef.current = onStateChange
  useEffect(() => {
    if (onStateChangeRef.current) {
      onStateChangeRef.current(debouncedState)
    }
  }, [debouncedState])

  // Render the UI for your table
  const { role, ...othertable } = getTableProps()
  return (
    <>
      <div className=" flex flex-1  flex-col-reverse  sm:justify-end lg:flex-row lg:justify-between">
        <FilterBar {...instance} disableGlobalFilter={disableGlobalFilter} />
        <div className="mb-2 flex gap-x-2">
          <ColumnHidePage {...instance} />
          {!disableSelection && (
            <ToolBar instance={instance} {...{ onAdd, onDelete, onEdit }} />
          )}
        </div>
      </div>
      <div className="mt-4 flex flex-col overflow-x-auto">
        <table
          {...othertable}
          className={
            isLoading
              ? 'before:spinner  table min-h-[200px] before:left-1/2 before:top-1/2'
              : 'table'
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
