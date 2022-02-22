import { FC } from 'react'
import {
  HeaderGroup,
  TableInstance,
  TablePropGetter,
  TableProps,
} from 'react-table'
import { SortIcon, SortUpIcon, SortDownIcon } from './icons'

export const TableContainer: FC<{
  getTableProps: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    propGetter?: TablePropGetter<any> | undefined
  ) => TableProps
}> = ({ children, getTableProps, ...ohter }) => {
  const { role, ...othertable } = getTableProps()

  return (
    <div className="flex min-w-full flex-col overflow-x-auto py-2 pt-4 align-middle">
      <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg" />
      <table
        {...ohter}
        {...othertable}
        className="min-w-full divide-y divide-gray-200"
      >
        {children}
      </table>
    </div>
  )
}

export const TableHeader: FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headerGroups: HeaderGroup<any>[]
}> = ({ headerGroups }) => {
  return (
    <thead className="bg-gray-50">
      {headerGroups.map((headerGroup, i) => (
        <tr {...headerGroup.getHeaderGroupProps()} key={i}>
          {headerGroup.headers.map((column) => (
            // Add the sorting props to control sorting. For this example
            // we can add them into the header props
            <th
              scope="col"
              className="group px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              {...column.getHeaderProps(column.getSortByToggleProps())}
              key={column.id}
            >
              <div className="flex items-center justify-between">
                {column.render('Header')}
                {/* Add a sort direction indicator */}
                <span>
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <SortDownIcon className="h-4 w-4 text-gray-400" />
                    ) : (
                      <SortUpIcon className="h-4 w-4 text-gray-400" />
                    )
                  ) : column.canSort ? (
                    <SortIcon className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100" />
                  ) : null}
                </span>
              </div>
            </th>
          ))}
        </tr>
      ))}
    </thead>
  )
}

export function TBody<
  D extends Record<string, unknown> = Record<string, unknown>
>({ getTableBodyProps, page, prepareRow }: TableInstance<D>) {
  return (
    <tbody
      {...getTableBodyProps()}
      className="divide-y divide-gray-200 bg-white"
    >
      {page.map((row) => {
        prepareRow(row)
        return (
          <tr {...row.getRowProps()} key={row.id}>
            {row.cells.map((cell, i) => {
              return (
                <td
                  {...cell.getCellProps()}
                  className="whitespace-nowrap px-6 py-4"
                  role="cell"
                  key={cell.value ?? i}
                >
                  {cell.render('Cell')}
                </td>
              )
            })}
          </tr>
        )
      })}
    </tbody>
  )
}
