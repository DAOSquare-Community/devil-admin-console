import Layout from 'components/admin-nav/layout'
import React, { FC, useCallback } from 'react'
import { NextPageWithLayout } from 'types/page'
import Table from 'components/table'
import Image from 'next/image'
import { CellProps, Column, TableInstance } from 'react-table'

import { Alert } from 'components/modal/cmd-alert'
import { Dao } from 'models/Dao'
import { useAxiosMutation, useAxiosQuery } from 'lib/request/use-fetch'
import { useRouter } from 'next/router'

const AvatarCell: FC<
  CellProps<never> & {
    column: { imgAccessor: string; categoryAccessor: string }
  }
> = ({ value, column, row }) => {
  // row.original
  console.log('AvatarCell', row.original[column.imgAccessor])
  return (
    <div className="flex items-center">
      <div className="h-10 w-10 flex-shrink-0">
        <Image
          width={40}
          height={40}
          className="h-10 w-10 rounded-full"
          src={row.original[column.imgAccessor]}
          alt=""
        />
      </div>
      <div className="ml-4">
        <div className="text-sm font-medium text-gray-900">{value}</div>
        <div className="text-sm text-gray-500">
          {row.original[column.categoryAccessor]}
        </div>
      </div>
    </div>
  )
}

const Daos: NextPageWithLayout = () => {
  const router = useRouter()

  const {
    data = [],
    refetch,
    isLoading,
  } = useAxiosQuery<{ data: Dao[] }, Dao[]>('/dao', undefined, {
    select: (sData) => {
      return sData.data
    },
  })

  const { mutate: remove } = useAxiosMutation<unknown>(
    '/dao',
    {
      onSuccess: () => {
        refetch()
      },
    },
    'delete'
  )

  const columns = React.useMemo<Column<Dao>[]>(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        Cell: AvatarCell,
        imgAccessor: 'logo',
        categoryAccessor: 'category',
      },
      {
        Header: 'StartTime',
        accessor: 'start_time',
        // Cell: StatusPill,
      },
      {
        id: '_action_check',
        Header: '',
        Cell: ({ row }: CellProps<Dao>) => {
          return (
            <button
              className="btn btn-primary"
              onClick={() => {
                router.push(`/admin/daos/${row.original.daoId}`)
              }}
            >
              Edit
            </button>
          )
        },
      },
    ],
    [router]
  )

  const onAdd = useCallback(() => {
    router.push('/admin/daos/add')
  }, [router])

  const onDelete = useCallback(
    (e: TableInstance<Dao>) => {
      // setWarning(true)
      Alert.show(
        `Are you sure you want to delete there accounts? All of there
    data will be permanently removed. This action cannot be
    undone.`,
        () => {
          const selecteds = e.selectedFlatRows.map((v) => v.original.daoId)
          remove({ userIds: selecteds })
        }
      )
    },
    [remove]
  )

  return (
    <div className="mx-auto pt-4 text-gray-900 sm:px-6 lg:px-0">
      <Table<Dao>
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

Daos.getLayout = (page) => <Layout>{page}</Layout>

export default Daos
