import Layout from 'components/nav/layout'
import React, { FC, useCallback } from 'react'
import { NextPageWithLayout } from 'types/page'
import Table from '../../components/table'
import Image from 'next/image'
import { CellProps, Column, TableInstance } from 'react-table'

import { Alert } from 'components/modal/cmd-alert'
import { Dao } from 'models/Dao'
import { useAxiosMutation, useAxiosQuery } from 'lib/request/use-fetch'
import { ScreenIndicator } from 'components/Indicator'
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

  const { data, refetch } = useAxiosQuery<{ data: Dao[] }, Dao[]>(
    '/dao',
    undefined,
    {
      select: (sData) => {
        return sData.data
      },
    }
  )

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
      // {
      //   Header: 'Role',
      //   accessor: 'roles',
      //   Cell: StatusPill,
      // },
      // {
      //   Header: 'Join Date',
      //   accessor: 'joinDate',
      // },
    ],
    []
  )

  const onAdd = useCallback(() => {
    router.push('/daos/add')
  }, [router])

  const onEdit = useCallback(
    (e: TableInstance<Dao>) => {
      router.push(`/daos/${e.selectedFlatRows[0].original.daoId}`)
    },
    [router]
  )

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

  if (!data) {
    return <ScreenIndicator />
  }

  return (
    <div className="mx-auto pt-4 text-gray-900 sm:px-6 lg:px-0">
      <Table<Dao>
        name={'Accounts'}
        columns={columns}
        data={data}
        onEdit={onEdit}
        onDelete={onDelete}
        onAdd={onAdd}
        showSelection
      />
    </div>
  )
}

Daos.getLayout = (page) => <Layout>{page}</Layout>

export default Daos
