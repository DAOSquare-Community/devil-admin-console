import { TableState } from 'react-table'
import { PagenationObjectType } from 'types/page'

const mapPageDataChange = <T extends object>(
  setState: React.Dispatch<React.SetStateAction<PagenationObjectType>>
) => {
  return ({
    pageIndex,
    pageSize,
    hiddenColumns,
    sortBy,
    filters,
  }: TableState<T>) => {
    const nFilters: PagenationObjectType['filters'] = {}
    filters.forEach(({ id, value }) => {
      if (!hiddenColumns?.includes(id)) {
        if (typeof value === 'string') {
          nFilters[id] = { $regex: value, $options: 'i' }
        } else if (typeof value === 'object') {
          if (value.from || value.to) {
            nFilters[id] = {
              $gte: value.from ? new Date(value.from) : undefined,
              $lte: value.to ? new Date(value.to) : undefined,
            }
          }
          if (value.value !== undefined && value.value !== null) {
            nFilters[id] = value.value
          }
        }
      }
    })
    const nSortBy: PagenationObjectType['sortBy'] = {}
    sortBy.forEach((s) => {
      if (!hiddenColumns?.includes(s.id)) {
        nSortBy[s.id] = s.desc ? 'desc' : 'asc'
      }
    })
    setState({
      pageSize,
      page: pageIndex,
      sortBy: nSortBy,
      filters: nFilters,
    })
  }
}

export default mapPageDataChange
