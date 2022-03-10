import Layout from 'components/nav/layout'
import React, { FC, useCallback, useState } from 'react'
import { NextPageWithLayout } from 'types/page'
import Table from '../components/table'
import Image from 'next/image'
import { Cell, CellProps, Column, TableInstance } from 'react-table'
import { UserType } from 'types/user'
import { Role } from 'types/permission'
import classNames from 'classnames'
import { Alert } from 'components/modal/cmd-alert'
import { Dao } from 'models/Dao'
import { useAxiosQuery } from 'lib/request/use-fetch'

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
        <img
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

const Accounts: NextPageWithLayout = () => {
  const [warning, setWaring] = useState(false)
  const [showEdit, setShowEdit] = useState(false)

  const { data } = useAxiosQuery<{ data: Dao[] }, Dao[]>('/dao', undefined, {
    select: (sData) => {
      return sData.data
    },
  })

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

  // const data = React.useMemo(() => getData(), [])

  const onAdd = useCallback((e: TableInstance<Dao>) => {
    setShowEdit(true)
    console.log(
      'e',
      e.selectedFlatRows.map((v) => `'${v.original.name}}'`).join(', ')
    )
  }, [])

  const onEdit = useCallback((e: TableInstance<Dao>) => {
    const selected = e.selectedFlatRows.map((v) => v.original)[0]
    setShowEdit(true)
  }, [])

  const onDelete = useCallback((e: TableInstance<Dao>) => {
    // setWarning(true)
    Alert.show(
      `Are you sure you want to delete there accounts? All of there
    data will be permanently removed. This action cannot be
    undone.`,
      () => {
        // const selecteds = e.selectedFlatRows.map((v) => v.original.id)
        // remove({ userIds: selecteds })
      }
    )
  }, [])

  if (data) {
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
        {/* <Alert
          isOpen={warning}
          onClose={() => setWaring(false)}
          onClick={() => setWaring(false)}
          message="Are you sure you want to delete there accounts? All of there
                  data will be permanently removed. This action cannot be
                  undone."
        /> */}
        {/* <Modal
          isOpen={showEdit}
          title="Update User Profile"
          // onClose={() => setIsopen(false)}
          // onSumbimit={() => setIsopen(false)}
        >
          <AccountForm
            isEdit={!userRef.current}
            user={userRef.current}
            onClose={() => {
              setShowEdit(false)
              userRef.current = undefined
            }}
          />
        </Modal> */}
      </div>
    )
  }

  return null
}

Accounts.getLayout = (page) => <Layout>{page}</Layout>

export default Accounts
