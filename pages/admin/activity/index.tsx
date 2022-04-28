import Layout from 'components/admin-nav/layout'
import React, { useCallback } from 'react'
import { NextPageWithLayout } from 'types/page'
import Table from 'components/table'
import { CellProps, Column, TableInstance } from 'react-table'

import { Alert } from 'components/modal/cmd-alert'
import { Activity } from 'models/activity'
import { useAxiosMutation, useAxiosQuery } from 'lib/request/use-fetch'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Activitys: NextPageWithLayout = () => {
  const router = useRouter()

  const {
    data = [],
    refetch,
    isLoading,
  } = useAxiosQuery<{ data: { items: Activity[] } }, Activity[]>(
    '/v2/activity/list',
    { pageSize: 10000 },
    {
      select: (sData) => {
        return sData.data.items
      },
    }
  )

  const { mutate: remove } = useAxiosMutation<unknown>(
    '/v2/activity',
    {
      onSuccess: () => {
        refetch()
      },
    },
    'delete'
  )

  const columns = React.useMemo<Column<Activity>[]>(
    () => [
      {
        Header: 'Name',
        accessor: 'title',
      },
      {
        Header: 'Location',
        accessor: 'location',
        // Cell: StatusPill,
      },
      {
        Header: 'StartAt',
        accessor: 'start_at',
        // Cell: StatusPill,
      },
      {
        Header: 'Is Active',
        accessor: 'is_active',
        Cell: ({ value }) => (value ? 'Yes' : 'No'),
      },
      {
        id: '_action_check',
        Header: '',
        Cell: ({ row }: CellProps<Activity>) => {
          return (
            <Link href={`/admin/activity/${row.original._id}`}>
              <a className="btn btn-primary">Edit</a>
            </Link>
          )
        },
      },
    ],
    []
  )

  const onAdd = useCallback(() => {
    router.push('/admin/activity/add')
  }, [router])

  const onDelete = useCallback(
    (e: TableInstance<Activity>) => {
      // setWarning(true)
      Alert.show(
        `Are you sure you want to delete there accounts? All of there
    data will be permanently removed. This action cannot be
    undone.`,
        () => {
          const selecteds = e.selectedFlatRows.map((v) => v.original._id)
          remove({ ids: selecteds })
        }
      )
    },
    [remove]
  )

  return (
    <div className="mx-auto pt-4 text-gray-900 sm:px-6 lg:px-0">
      <Table<Activity>
        name={'Accounts'}
        columns={columns}
        data={data}
        onDelete={onDelete}
        onAdd={onAdd}
        disableSelection={false}
        isLoading={isLoading}
      />
    </div>
  )
}

Activitys.getLayout = (page) => <Layout>{page}</Layout>

export default Activitys
