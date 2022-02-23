import { PropsWithChildren } from 'react'
import { TableInstance } from 'react-table'
import { MinusIcon, PencilAltIcon, PlusIcon } from './icons'

type TableToolbarProps<T extends Record<string, unknown>> = {
  instance: TableInstance<T>
  onAdd?: (instance: TableInstance<T>) => void
  onDelete?: (instance: TableInstance<T>) => void
  onEdit?: (instance: TableInstance<T>) => void
}

export function ToolBar<T extends Record<string, unknown>>({
  instance,
  onEdit,
  onAdd,
  onDelete,
}: PropsWithChildren<TableToolbarProps<T>>) {
  const { state } = instance
  return (
    <div className="mb-2 sm:flex sm:gap-x-2">
      {onEdit && (
        <button
          className="btn btn-ghost btn-sm btn-circle"
          onClick={() => onEdit(instance)}
          disabled={
            state.selectedRowIds &&
            Object.keys(state.selectedRowIds).length !== 1
          }
        >
          <PencilAltIcon className="h-5 w-5 text-gray-400" />
        </button>
      )}

      {onAdd && (
        <button
          className="btn btn-ghost btn-sm btn-circle"
          onClick={() => onAdd(instance)}
          disabled={
            state.selectedRowIds &&
            Object.keys(state.selectedRowIds).length !== 0
          }
        >
          <PlusIcon className="h-5 w-5 text-gray-400" />
        </button>
      )}
      {onDelete && (
        <button
          className="btn btn-ghost btn-sm btn-circle"
          onClick={() => onDelete(instance)}
          disabled={
            state.selectedRowIds &&
            Object.keys(state.selectedRowIds).length === 0
          }
        >
          <MinusIcon className="h-5 w-5 text-gray-400" />
        </button>
      )}
    </div>
  )
}
