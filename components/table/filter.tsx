/* eslint-disable react/jsx-key */
import React, { useCallback } from 'react'
import 'regenerator-runtime/runtime'
import {
  ColumnInstance,
  IdType,
  Row,
  TableInstance,
  useAsyncDebounce,
} from 'react-table'
import { matchSorter } from 'match-sorter'

// Define a default UI for filtering
export function GlobalFilter<
  D extends Record<string, unknown> = Record<string, unknown>
>({ preGlobalFilteredRows, state, setGlobalFilter }: TableInstance<D>) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = React.useState(state.globalFilter)
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined)
  }, 200)

  return (
    <label className="flex items-baseline gap-x-2">
      <span className="text-gray-700">Search: </span>
      <input
        type="text"
        className="dmc-form-input"
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value)
          onChange(e.target.value)
        }}
        placeholder={`${count} records...`}
      />
    </label>
  )
}

// This is a custom filter UI for selecting
// a unique option from a list
export function SelectColumnFilter<
  D extends Record<string, unknown> = Record<string, unknown>
>({
  column: { filterValue, setFilter, preFilteredRows, id, render },
}: {
  column: ColumnInstance<D>
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set()
    preFilteredRows.forEach((row) => {
      options.add(row.values[id])
    })
    return [...options.values()]
  }, [id, preFilteredRows])

  // Render a multi-select box
  return (
    <label className="flex items-baseline gap-x-2">
      <span className="text-gray-700">{render('Header')}: </span>
      <select
        className="rounded-md "
        name={id}
        id={id}
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined)
        }}
      >
        <option value="">All</option>
        {options.map((option, i) => (
          <option key={i} value={option as string}>
            {option as string}
          </option>
        ))}
      </select>
    </label>
  )
}

export function FilterBar<
  D extends Record<string, unknown> = Record<string, unknown>
>(props: TableInstance<D>) {
  const { headerGroups } = props
  return (
    <div className="sm:flex sm:gap-x-2">
      <GlobalFilter {...props} />
      {headerGroups.map((headerGroup) =>
        headerGroup.headers.map((column) =>
          column.Filter ? (
            <div className="mt-2 sm:mt-0" key={column.id}>
              {column.render('Filter')}
            </div>
          ) : null
        )
      )}
    </div>
  )
}

export const useGlobalMatchSorter = <T extends object>() => {
  return useCallback((rows: Row<T>[], ids: IdType<T>[], query: string) => {
    const keys = rows?.[0]?.cells
      ?.filter((res) => !res.column.disableGlobalFilter)
      .map(({ column }) =>
        Array.isArray(column.globalFiltersKey)
          ? column.globalFiltersKey
          : `values.${column.globalFiltersKey ?? column.id}`
      )
    return matchSorter(rows, query, {
      keys,
    })
  }, [])
}
