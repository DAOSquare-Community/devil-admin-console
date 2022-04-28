import { PropsWithChildren } from 'react'
import { TableInstance } from 'react-table'
import { MinusIcon, PlusIcon } from './icons'

type TableToolbarProps<T extends Record<string, unknown>> = {
  instance: TableInstance<T>
  onAdd?: (instance: TableInstance<T>) => void
  onDelete?: (instance: TableInstance<T>) => void
}

export function ToolBar<T extends Record<string, unknown>>({
  instance,
  onAdd,
  onDelete,
}: PropsWithChildren<TableToolbarProps<T>>) {
  const { state } = instance

  return (
    <div className="sm:flex sm:gap-x-2">
      {onDelete &&
        (!state.selectedRowIds ||
          Object.keys(state.selectedRowIds).length !== 0) && (
          <div
            className=" tooltip-top tooltip   hover:tooltip-open"
            data-tip="Delete"
          >
            <button
              className="btn btn-ghost btn-sm btn-circle"
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                state.selectedRowIds = {}
                onDelete(instance)
              }}
              disabled={
                state.selectedRowIds &&
                Object.keys(state.selectedRowIds).length === 0
              }
            >
              <MinusIcon className="h-5 w-5 " />
            </button>
          </div>
        )}
      {onAdd && (
        <div
          className="  tooltip-top tooltip  hover:tooltip-open"
          data-tip="Add"
        >
          <button
            className="btn btn-ghost btn-sm btn-circle"
            onClick={() => onAdd(instance)}
          >
            <PlusIcon className="h-5 w-5 " />
          </button>
        </div>
      )}
    </div>
  )
}
