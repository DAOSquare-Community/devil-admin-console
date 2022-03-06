import Layout from 'components/layout'
import React, { FC, useCallback, useRef, useState } from 'react'
import { NextPageWithLayout } from 'types/page'
import Table from '../components/table'
import Image from 'next/image'
import { Cell, CellProps, Column, TableInstance } from 'react-table'
import { useGqlQuery } from 'lib/request/use-gql-fetch'
import { gql } from 'graphql-request'
import { UserType } from 'types/user'
import { Role } from 'types/permission'
import classNames from 'classnames'
import { Alert } from 'components/alert'
import { Modal } from 'components/modal'
import AccountForm from 'components/form/account-update'

const AvatarCell: FC<
  CellProps<never> & { column: { imgAccessor: string; emailAccessor: string } }
> = ({ value, column, row }) => {
  // row.original

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

const usrsGql = gql`
  query users {
    users {
      id
      roles {
        id
        name
      }
      name
      email
      password
      joinDate
      title
      slackId
    }
  }
`

// const Tabel

const Accounts: NextPageWithLayout = () => {
  const [warning, setWaring] = useState(false)
  const [showEdit, setShowEdit] = useState(false)

  // const { data } = useGqlQuery<{ users: UserType[] }, UserType[]>(
  //   usrsGql,
  //   { userId: 1 },
  //   {
  //     select: (sData) => {
  //       return sData.users.map((u) => {
  //         u.avatar =
  //           'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90[…]VufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
  //         // u.roles = ['admin', 'member']
  //         return u
  //       })
  //     },
  //   }
  // )

  const { data } = { data: [] }

  const columns = React.useMemo<Column<UserType>[]>(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        Cell: AvatarCell,
        imgAccessor: 'avatar',
        emailAccessor: 'title',
      },
      {
        Header: 'Email',
        accessor: 'email',
        // Cell: StatusPill,
      },
      {
        Header: 'Role',
        accessor: 'roles',
        Cell: StatusPill,
      },
    ],
    []
  )

  // const data = React.useMemo(() => getData(), [])

  const onAdd = useCallback((e: TableInstance<UserType>) => {
    setShowEdit(true)
    console.log(
      'e',
      e.selectedFlatRows
        .map((v) => `'${v.original.name} ${v.original.email}'`)
        .join(', ')
    )
  }, [])

  const userRef = useRef<UserType>()
  const onEdit = useCallback((e: TableInstance<UserType>) => {
    const selected = e.selectedFlatRows.map((v) => v.original)[0]
    userRef.current = selected
    setShowEdit(true)
  }, [])

  const onDelete = useCallback(() => {
    setWaring(true)
  }, [])

  if (data) {
    return (
      <div className="mx-auto pt-4 text-gray-900 sm:px-6 lg:px-0">
        <Table<UserType>
          name={'Accounts'}
          columns={columns}
          data={data}
          onEdit={onEdit}
          onDelete={onDelete}
          onAdd={onAdd}
          showSelection
        />
        <Alert
          isOpen={warning}
          onClose={() => setWaring(false)}
          onClick={() => setWaring(false)}
          message="Are you sure you want to delete there accounts? All of there
                  data will be permanently removed. This action cannot be
                  undone."
        />
        <Modal
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
        </Modal>
      </div>
    )
  }

  return null
}

Accounts.getLayout = (page) => <Layout>{page}</Layout>

export default Accounts
