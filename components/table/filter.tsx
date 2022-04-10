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
import RSelect from 'components/the-third-party/select'

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
    <label className="label flex items-baseline gap-x-2">
      <span>Search: </span>
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
  column: {
    filterValue,
    setFilter,
    preFilteredRows,
    id,
    render,
    filterOptions,
  },
}: {
  column: ColumnInstance<D>
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    if (filterOptions) {
      return filterOptions
    }
    const options = new Set<string>()
    preFilteredRows.forEach((row) => {
      options.add(row.values[id])
    })
    return [{ label: 'all', value: '' }].concat(
      ...[...options.values()].map((value) => ({ value, label: value }))
    )
  }, [id, preFilteredRows, filterOptions])

  // Render a multi-select box
  return (
    <label className="label mr-2 flex  items-baseline gap-x-2">
      <span className="mb-2 min-w-[80px] xl:min-w-fit">
        {render('Header')}:{' '}
      </span>
      <RSelect
        className={'dmc-react-select  xl:min-w-fit'}
        options={options}
        value={filterValue}
        onChange={(e) => {
          setFilter(e)
        }}
      />
    </label>
  )
}

export function InputColumnFilter<
  D extends Record<string, unknown> = Record<string, unknown>
>({
  column: { filterValue, setFilter, id, render },
}: {
  column: ColumnInstance<D>
}) {
  // Render a multi-select box
  return (
    <label className="label mr-2 flex  items-baseline gap-x-2">
      <span className="mb-2 min-w-[80px] xl:min-w-fit">
        {render('Header')}:{' '}
      </span>
      <input
        className="dmc-form-input min-w-[150px] "
        name={id}
        id={id}
        value={filterValue || ''}
        onChange={(e) => {
          setFilter(e.target.value ?? undefined)
        }}
      />
    </label>
  )
}

export function DateColumnFilter<
  D extends Record<string, unknown> = Record<string, unknown>
>({
  column: { filterValue, setFilter, id, render },
}: {
  column: ColumnInstance<D>
}) {
  // Render a multi-select box
  return (
    <label className="label mr-2 flex  items-baseline gap-x-2">
      <span className="mb-2 min-w-[80px]  xl:min-w-fit">
        {render('Header')}:{' '}
      </span>
      <input
        className="dmc-form-input max-w-[160px] "
        name={id}
        id={id}
        type="date"
        value={filterValue?.from ?? ''}
        onChange={(e) => {
          setFilter((s: object) => ({
            ...s,
            from: e.target.value?.length > 0 ? e.target.value : undefined,
          }))
        }}
      />
      <span className="label mb-2">To</span>
      <input
        className="dmc-form-input max-w-[160px] "
        name={id}
        id={id}
        type="date"
        value={filterValue?.to ?? ''}
        onChange={(e) => {
          setFilter((s: object) => ({
            ...s,
            to: e.target.value?.length > 0 ? e.target.value : undefined,
          }))
        }}
      />
    </label>
  )
}

export function FilterBar<
  D extends Record<string, unknown> = Record<string, unknown>
>(props: TableInstance<D> & { disableGlobalFilter?: boolean }) {
  const { headerGroups, disableGlobalFilter } = props
  return (
    <div className="flex flex-wrap gap-x-2">
      {!disableGlobalFilter && <GlobalFilter {...props} />}
      {headerGroups.map((headerGroup) =>
        headerGroup.headers.map((column) =>
          column.Filter ? (
            <div className="mt-2 " key={column.id}>
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
      ?.filter?.((res) => !res.column.disableGlobalFilter)
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
