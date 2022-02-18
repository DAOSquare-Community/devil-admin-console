import Layout from 'components/layout'
import { useMemo } from 'react'
import { NextPageWithLayout } from 'types/page'
import { useTable } from 'react-table'
import makeData from 'lib/make-data'
import clientPromise from 'lib/mongodb'
// Define a default UI for filtering

// Our table component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Table({ columns, data }: { columns: any; data: any }) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    })

  // Render the UI for your table
  return (
    <table {...getTableProps()} className=" table-zebra table  w-full ">
      <thead>
        {headerGroups.map((headerGroup, i) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={i}>
            {headerGroup.headers.map((column, i) => (
              <th {...column.getHeaderProps()} key={i}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()} className=" overflow-y-scroll ">
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()} key={i}>
              {row.cells.map((cell, i) => {
                return (
                  <td {...cell.getCellProps()} key={i}>
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
const Home: NextPageWithLayout = () => {
  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
            // Use our custom `fuzzyText` filter on this column
            filter: 'fuzzyText',
          },
        ],
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Age',
            accessor: 'age',
            filter: 'equals',
          },
          {
            Header: 'Visits',
            accessor: 'visits',
            filter: 'between',
          },
          {
            Header: 'Status',
            accessor: 'status',
            filter: 'includes',
          },
          {
            Header: 'Profile Progress',
            accessor: 'progress',
          },
        ],
      },
    ],
    []
  )

  const data = useMemo(() => makeData(20), [])

  return (
    <div>
      <Table columns={columns} data={data} />
    </div>
  )
}

Home.getLayout = (page) => <Layout>{page}</Layout>

export async function getServerSideProps() {
  try {
    // client.db() will be the default database passed in the MONGODB_URI
    // You can change the database by calling the client.db() function and specifying a database like:
    // const db = client.db("myDatabase");
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands
    await clientPromise
    return {
      props: { isConnected: true },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}

export default Home
