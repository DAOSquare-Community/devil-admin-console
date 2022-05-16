import Layout from 'components/admin-nav/layout'
import React, { useState } from 'react'
import { NextPageWithLayout, PagenationObjectType } from 'types/page'
import Table from 'components/table'
import { Column } from 'react-table'
import { InputColumnFilter, SelectColumnFilter } from 'components/table/filter'
// import dynamic from 'next/dynamic'
import { useAxiosMutation, useAxiosQuery } from 'lib/request/use-fetch'
import { PageData } from 'types/resultmsg'
import mapPageDataChange from 'lib/utils/page'
import { Member } from 'models/Member'
// const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false })

// const Tabel

const Members: NextPageWithLayout = () => {
  const [state, setState] = useState<PagenationObjectType>({
    page: 0,
    pageSize: 0,
  })

  const { data, isLoading, refetch } = useAxiosQuery<
    {
      data: PageData<Member>
    },
    PageData<Member>
  >(
    '/v2/member/list',
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

  const { mutate } = useAxiosMutation<{
    filter: { _id?: string }
    update: Partial<Member>
  }>(
    '/v2/member',
    {
      onSuccess: () => {
        refetch()
      },
    },
    'PUT'
  )

  const columns = React.useMemo<Column<Member>[]>(
    () => [
      {
        Header: 'Address',
        accessor: 'wallet_address',
        disableSortBy: true,
        Filter: InputColumnFilter,
      },
      {
        Header: 'Name',
        accessor: 'name',
        disableSortBy: true,
        Filter: InputColumnFilter,
      },
      {
        Header: 'Gender',
        accessor: 'gender',
        filterOptions: [
          { value: null, label: 'ALL' },
          { value: 'female', label: 'Female' },
          { value: 'male', label: 'Male' },
        ],
        Filter: SelectColumnFilter,
      },
      {
        Header: 'Profile',
        accessor: 'profile',
        disableSortBy: true,
      },

      {
        Header: 'IsHot',
        accessor: 'is_hot',
        sortDescFirst: true,
        Filter: SelectColumnFilter,
        filterOptions: [
          { value: null, label: 'ALL' },
          { value: true, label: 'YES' },
          { value: false, label: 'NO' },
        ],
        Cell: ({ value, row }) => {
          return (
            <input
              type="checkbox"
              className="toggle"
              checked={value}
              onChange={(e) => {
                mutate({
                  filter: { _id: row.original._id },
                  update: { is_hot: e.target.checked },
                })
              }}
            />
          )
        },
      },
    ],
    [mutate]
  )

  return (
    <div className="mx-auto pt-4 text-gray-900 sm:px-6 lg:px-0">
      <Table<Member>
        name={'members'}
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

Members.getLayout = (page) => <Layout>{page}</Layout>

export default Members
