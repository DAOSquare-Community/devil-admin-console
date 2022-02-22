import React, { MouseEventHandler, PropsWithChildren, useEffect } from 'react'
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
import { FilterBar } from './filter'
import { TableContainer, TableHeader, TBody } from './table'
import { selectionHook } from './hooks'
import { ToolBar } from './toolbar'
// import { useDebounce, useLocalStorage } from 'lib/utils'

export interface TableProperties<T extends Record<string, unknown>>
  extends TableOptions<T> {
  name?: string
  onAdd?: (instance: TableInstance<T>) => void
  onDelete?: (instance: TableInstance<T>) => void
  onEdit?: (instance: TableInstance<T>) => void
  onClick?: (row: Row<T>) => void
  showSelection?: boolean
}

function ComboTable<T extends Record<string, unknown>>(
  props: PropsWithChildren<TableProperties<T>>
) {
  // Use the state and functions returned from useTable to build your UI
  const {
    name,
    onAdd,
    onDelete,
    onEdit,
    onClick,
    showSelection = false,
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
  const instance = useTable({ ...others }, ...hooks)
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
  return (
    <>
      <div className=" flex flex-1  flex-col-reverse sm:justify-end lg:flex-row lg:justify-between">
        <FilterBar {...instance} />
        {showSelection && (
          <ToolBar instance={instance} {...{ onAdd, onDelete, onEdit }} />
        )}
      </div>
      <TableContainer getTableProps={instance.getTableProps}>
        <TableHeader {...instance} />
        <TBody {...instance} />
      </TableContainer>
      <Pagination {...instance} />
    </>
  )
}

export default ComboTable
