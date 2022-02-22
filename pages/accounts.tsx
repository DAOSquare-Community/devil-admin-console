import Layout from 'components/base/layout'
import React, { FC } from 'react'
import { NextPageWithLayout } from 'types/page'
import Table from '../components/table'
import { SelectColumnFilter } from '../components/table/filter'
import Image from 'next/image'
import { classNames } from 'lib/utils'
import { Cell, CellProps, Column, TableInstance } from 'react-table'

const getData = () => {
  const data = [
    {
      name: 'Jane Cooper',
      email: 'jane.cooper@example.com',
      title: 'Regional Paradigm Technician',
      department: 'Optimization',
      status: 'Active',
      role: 'Admin',
      age: 27,
      imgUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
      name: 'Cody Fisher',
      email: 'cody.fisher@example.com',
      title: 'Product Directives Officer',
      department: 'Intranet',
      status: 'Inactive',
      role: 'Owner',
      age: 43,
      imgUrl:
        'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
      name: 'Esther Howard',
      email: 'esther.howard@example.com',
      title: 'Forward Response Developer',
      department: 'Directives',
      status: 'Active',
      role: 'Member',
      age: 32,
      imgUrl:
        'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
      name: 'Jenny Wilson',
      email: 'jenny.wilson@example.com',
      title: 'Central Security Manager',
      department: 'Program',
      status: 'Offline',
      role: 'Member',
      age: 29,
      imgUrl:
        'https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
      name: 'Kristin Watson',
      email: 'kristin.watson@example.com',
      title: 'Lean Implementation Liaison',
      department: 'Mobility',
      status: 'Inactive',
      role: 'Admin',
      age: 36,
      imgUrl:
        'https://images.unsplash.com/photo-1532417344469-368f9ae6d187?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    {
      name: 'Cameron Williamson',
      email: 'cameron.williamson@example.com',
      title: 'Internal Applications Engineer',
      department: 'Security',
      status: 'Active',
      role: 'Member',
      age: 24,
      imgUrl:
        'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
  ]
  return [...data, ...data, ...data]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export function StatusPill({ value }: Cell<Record<string, unknown>, string>) {
  const status = value ? value.toLowerCase() : 'unknown'

  return (
    <span
      className={classNames(
        'leading-wide rounded-full px-3 py-1 text-xs font-bold uppercase shadow-sm',
        status.startsWith('active') ? 'bg-green-100 text-green-800' : null,
        status.startsWith('inactive') ? 'bg-yellow-100 text-yellow-800' : null,
        status.startsWith('offline') ? 'bg-red-100 text-red-800' : null
      )}
    >
      {status}
    </span>
  )
}

type Data = {
  name: string
  email: string
  title: string
  department: string
  status: string
  role: string
  age: number
  imgUrl: string
}

const Accounts: NextPageWithLayout = () => {
  const columns: Column<Data>[] = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
        Cell: AvatarCell,
        imgAccessor: 'imgUrl',
        emailAccessor: 'email',
      },
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Status',
        accessor: 'status',
        Filter: SelectColumnFilter, // new
        Cell: StatusPill,
      },
      {
        Header: 'Age',
        accessor: 'age',
      },
      {
        Header: 'Role',
        accessor: 'role',
        Filter: SelectColumnFilter, // new
        filter: 'includes',
      },
    ],
    []
  )

  const data = React.useMemo(() => getData(), [])

  const onClick = (e: TableInstance<Data>) => {
    console.log(
      'e',
      e.selectedFlatRows
        .map((v) => `'${v.original.name} ${v.original.email}'`)
        .join(', ')
    )
  }

  return (
    <div className="mx-auto pt-4 text-gray-900 sm:px-6 lg:px-0">
      <Table<Data>
        name={'Accounts'}
        columns={columns}
        data={data}
        onEdit={onClick}
        onDelete={onClick}
        onAdd={onClick}
      />
    </div>
  )
}

Accounts.getLayout = (page) => <Layout>{page}</Layout>

export default Accounts
