import Layout from 'components/nav/layout'
import React, { FC, useCallback } from 'react'
import { NextPageWithLayout } from 'types/page'
import Table from '../../components/table'
import Image from 'next/image'
import { Cell, CellProps, Column, TableInstance } from 'react-table'
import { Role } from 'types/permission'
import classNames from 'classnames'
import { Alert } from 'components/modal/cmd-alert'
import { ScreenIndicator } from 'components/Indicator'
import { useRouter } from 'next/router'
import { useAxiosMutation, useAxiosQuery } from 'lib/request/use-fetch'
import { User } from 'models/User'

const AvatarCell: FC<
  CellProps<never> & { column: { imgAccessor: string; emailAccessor: string } }
> = ({ value, column, row }) => {
  // row.original

  return (
    <div className="flex items-center">
      {/* <Image
          width={40}
          height={40}
          className="h-10 w-10 rounded-full"
          src={row.original[column.imgAccessor]}
          alt=""
        /> */}
      <div className="ml-4">
        <div className="text-sm font-medium text-gray-900">{value}</div>
        <div className="text-sm text-gray-500">
          {row.original[column.emailAccessor]}
        </div>
      </div>
    </div>
  )
}

export function StatusPill({ value }: Cell<Record<string, unknown>, Role[]>) {
  const roles = value.map((v) => {
    const role = v ? v.toLowerCase() : 'unknown'
    return (
      <span
        key={role}
        className={classNames(
          'leading-wide max-w-16 rounded-full px-3 py-1 text-xs font-bold uppercase  shadow-sm',
          role.startsWith('admin') ? 'bg-green-100 text-green-800' : null,
          role.startsWith('member') ? 'bg-yellow-100 text-yellow-800' : null,
          role.startsWith('super-admin') ? 'bg-red-100 text-red-800' : null
        )}
      >
        {role}
      </span>
    )
  })

  // console.log(roles)

  return <div className={'flex  flex-col gap-2 xl:flex-row'}>{roles}</div>
}

// const Tabel

const Accounts: NextPageWithLayout = () => {
  const router = useRouter()

  const { data, refetch } = useAxiosQuery<{ data: { items: User[] } }, User[]>(
    '/v2/user/list',
    { pageSize: 10000 },
    {
      select: (sData) => {
        return sData.data.items
      },
    }
  )

  const { mutate: remove } = useAxiosMutation<unknown>(
    '/v2/user',
    {
      onSuccess: () => {
        refetch()
      },
    },
    'delete'
  )

  const columns = React.useMemo<Column<User>[]>(
    () => [
      // {
      //   Header: 'Name',
      //   accessor: 'name',
      //   Cell: AvatarCell,
      // },
      {
        Header: 'Wallet',
        accessor: 'wallet_address',
        // Cell: StatusPill,
      },
      {
        Header: 'Role',
        accessor: 'role',
        Cell: StatusPill,
      },
    ],
    []
  )

  const onEdit = useCallback(
    (e: TableInstance<User>) => {
      router.push(`/accounts/${e.selectedFlatRows[0].original._id}`)
    },
    [router]
  )

  const onDelete = useCallback(
    (e: TableInstance<User>) => {
      // setWarning(true)
      Alert.show(
        `Are you sure you want to delete there accounts? All of there
    data will be permanently removed. This action cannot be
    undone.`,
        () => {
          const selecteds = e.selectedFlatRows.map((v) => v.original._id)
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
      <Table<User>
        name={'Accounts'}
        columns={columns}
        data={data}
        onEdit={onEdit}
        onDelete={onDelete}
        showSelection
      />
    </div>
  )
}

Accounts.getLayout = (page) => <Layout>{page}</Layout>

export default Accounts
