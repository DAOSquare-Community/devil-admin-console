import Layout from 'components/admin-nav/layout'
import React, { useState } from 'react'
import { NextPageWithLayout, PagenationObjectType } from 'types/page'
import Table from 'components/table'
import { Column } from 'react-table'
import { DateColumnFilter, InputColumnFilter } from 'components/table/filter'
import dayjs from 'dayjs'
// import dynamic from 'next/dynamic'
import { LogOp } from 'models/LogOp'
import safeJsonParse from 'lib/utils/safe-json-parse'
import JsonView from 'components/the-third-party/json-view'
import { useAxiosQuery } from 'lib/request/use-fetch'
import { PageData } from 'types/resultmsg'
import mapPageDataChange from 'lib/utils/page'
// const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false })

// const Tabel

const ActionLog: NextPageWithLayout = () => {
  const [state, setState] = useState<PagenationObjectType>({
    page: 0,
    pageSize: 0,
  })

  const { data, isLoading } = useAxiosQuery<
    {
      data: PageData<LogOp>
    },
    PageData<LogOp>
  >(
    '/v2/logop/list',
    {
      ...state,
    },
    {
      select: (sData) => {
        return sData.data
      },
      // keepPreviousData: true,
      // staleTime: Infinity,
      enabled: state.pageSize > 0,
    }
  )
  const { items, totalCount = 0 } = data ?? {}

  const columns = React.useMemo<Column<LogOp>[]>(
    () => [
      {
        Header: 'Path',
        accessor: 'path',
        disableSortBy: true,
        Filter: InputColumnFilter,
      },
      {
        Header: 'ID',
        disableSortBy: true,
        accessor: '_id',
      },
      {
        Header: 'Params',
        accessor: 'params',
        disableSortBy: true,
        Cell: ({ value }) => {
          const txt = safeJsonParse(value)
          if (typeof txt === 'object') {
            return (
              <JsonView
                name={null}
                src={txt}
                collapsed={1}
                indentWidth={2}
                enableClipboard={false}
                displayDataTypes={false}
                groupArraysAfterLength={3}
                sortKeys
              />
            )
          }
          return txt
        },
      },

      {
        Header: 'CreateAt',
        accessor: 'create_at',
        sortDescFirst: true,
        Filter: DateColumnFilter,
        disableSortBy: false,
        Cell: ({ value }) => {
          return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
        },
      },
    ],
    []
  )

  return (
    <div className="mx-auto pt-4 text-gray-900 sm:px-6 lg:px-0">
      <Table<LogOp>
        name={'action-log'}
        columns={columns}
        data={items ?? []}
        isLoading={isLoading}
        manualPagination
        manualFilters
        manualSortBy
        pageCount={Math.ceil(totalCount / state.pageSize)}
        autoResetPage
        // disableSortBy={true}
        disableGlobalFilter={true}
        initialState={{
          sortBy: [
            {
              id: 'createAt',
              desc: true,
            },
          ],
        }}
        onStateChange={mapPageDataChange(setState)}
      />
    </div>
  )
}

ActionLog.getLayout = (page) => <Layout>{page}</Layout>

export default ActionLog
