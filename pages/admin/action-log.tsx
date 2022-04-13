import Layout from 'components/admin-nav/layout'
import React, { useState } from 'react'
import { NextPageWithLayout, PagenationType } from 'types/page'
import Table from 'components/table'
import { Column } from 'react-table'
import { DateColumnFilter } from 'components/table/filter'
import dayjs from 'dayjs'
// import dynamic from 'next/dynamic'
import { LogOp } from 'models/LogOp'
import { useAxiosQuery } from 'lib/request/use-fetch'
// const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false })

// const Tabel

const ActionLog: NextPageWithLayout = () => {
  const [state, setState] = useState<PagenationType>({
    page: 0,
    pageSize: 0,
  })
  const { data = [], isLoading } = useAxiosQuery<
    { data: { items: LogOp[] } },
    LogOp[]
  >('/v2/logop/list', state, {
    select: (sData) => {
      return sData.data.items
    },
    keepPreviousData: true,
    staleTime: Infinity,
    enabled: state.pageSize > 0,
  })

  const columns = React.useMemo<Column<LogOp>[]>(
    () => [
      {
        Header: 'optime',
        accessor: 'optime',
        Cell: ({ value }) => {
          return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
        },
        Filter: DateColumnFilter,
      },
      //   {
      //     Header: 'Email',
      //     accessor: 'userEmail',
      //     Filter: InputColumnFilter,
      //     disableSortBy: true,
      //   },
      //   {
      //     Header: 'API-Name',
      //     accessor: 'resourceName',
      //     Filter: InputColumnFilter,
      //     disableSortBy: true,
      //   },
      //   {
      //     Header: 'Payload',
      //     accessor: 'action',
      //     disableSortBy: true,
      //     Cell: ({ value }) => {
      //       return (
      //         <>
      //           {value && (
      //             <DynamicReactJson
      //               name={null}
      //               src={value}
      //               collapsed={1}
      //               indentWidth={2}
      //               enableClipboard={false}
      //               displayDataTypes={false}
      //               groupArraysAfterLength={3}
      //               sortKeys
      //             />
      //           )}
      //         </>
      //       )
      //     },
      //   },
      //   {
      //     Header: 'Result',
      //     accessor: 'result',
      //     disableSortBy: true,
      //     Cell: ({ value }) => {
      //       return (
      //         <>
      //           {value && (
      //             <DynamicReactJson
      //               name={false}
      //               src={value}
      //               collapsed={2}
      //               collapseStringsAfterLength={10}
      //               indentWidth={2}
      //               groupArraysAfterLength={3}
      //               displayDataTypes={false}
      //               enableClipboard={false}
      //               sortKeys
      //             />
      //           )}
      //         </>
      //       )
      //     },
      //   },
      //   {
      //     Header: 'Successed',
      //     accessor: 'isSuccessed',
      //     Cell: ({ value }) => {
      //       return value ? 'YES' : 'NO'
      //     },
      //     Filter: SelectColumnFilter,
      //     filterOptions: [
      //       { value: '', label: 'ALL' },
      //       { value: 'true', label: 'YES' },
      //       { value: 'false', label: 'NO' },
      //     ],
      //   },
    ],
    []
  )

  return (
    <div className="mx-auto pt-4 text-gray-900 sm:px-6 lg:px-0">
      <Table<LogOp>
        name={'action-log'}
        columns={columns}
        data={data}
        isLoading={isLoading}
        manualPagination
        manualFilters
        manualSortBy
        // pageCount={data?.pages ?? 0}
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
        onStateChange={({
          pageIndex,
          pageSize,
          hiddenColumns,
          sortBy,
          filters,
        }) => {
          setState({ pageSize, page: pageIndex })
          //   const nSortBy = sortBy.filter((s) => !hiddenColumns?.includes(s.id))
          //   const nFilters = filters
          //     .filter((s) => !hiddenColumns?.includes(s.id))
          //     .map((e) => {
          //       const n = { ...e }
          //       if (n.value?.label) {
          //         n.value = n.value?.value
          //       }
          //       n.value =
          //         typeof n.value !== 'string' ? JSON.stringify(n.value) : n.value
          //       return n
          //     })
          //   setState({
          //     page: pageIndex + 1,
          //     perPage: pageSize,
          //     sortBy: nSortBy,
          //     filters: nFilters,
          //   })
        }}
      />
    </div>
  )
}

ActionLog.getLayout = (page) => <Layout>{page}</Layout>

export default ActionLog
