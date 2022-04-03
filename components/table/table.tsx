import classNames from 'classnames'
import { BaseSyntheticEvent, FC } from 'react'
import { Cell, HeaderGroup, Row, TableInstance } from 'react-table'
import { SortIcon, SortUpIcon, SortDownIcon } from './icons'

export const TableHeader: FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headerGroups: HeaderGroup<any>[]
}> = ({ headerGroups }) => {
  return (
    <thead>
      {headerGroups.map((headerGroup, i) => (
        <tr {...headerGroup.getHeaderGroupProps()} key={i}>
          {headerGroup.headers.map((column) => (
            // Add the sorting props to control sorting. For this example
            // we can add them into the header props
            <th
              // scope="col"
              // className=" px-6 py-3  "
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
>({
  getTableBodyProps,
  page,
  prepareRow,
  onClick,
}: TableInstance<D> & {
  onClick?: (row: Row<D>, e: BaseSyntheticEvent) => void
}) {
  const cellClickHandler = (cell: Cell<D>) => (e: BaseSyntheticEvent) => {
    onClick &&
      !cell.column.isGrouped &&
      !cell.row.isGrouped &&
      cell.column.id !== '_selector' &&
      onClick(cell.row, e)
  }
  return (
    <tbody {...getTableBodyProps()}>
      {page?.map((row, index) => {
        prepareRow(row)
        return (
          <tr
            {...row.getRowProps()}
            key={row.id ?? index}
            className={classNames({
              hover: !!onClick,
              'cursor-pointer': !!onClick,
            })}
          >
            {row.cells.map((cell, i) => {
              return (
                <td
                  // className="whitespace-pre-line "
                  role="cell"
                  onClick={cellClickHandler(cell)}
                  {...cell.getCellProps()}
                  key={i}
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
