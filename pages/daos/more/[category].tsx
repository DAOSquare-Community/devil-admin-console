import DaoLayout from 'components/dao-square-nav/layout'
import DSIuput from 'components/input/ds-input'
import { NextPageWithLayout } from 'types/page'
// import Link from 'next/link'
import { useAxiosQuery } from 'lib/request/use-fetch'
import { Dao } from 'models/Dao'
import { IconCardLink } from 'components/card/iconCard'
import { useState } from 'react'

const DaoMore: NextPageWithLayout<{ category: string }> = ({ category }) => {
  const [text, setText] = useState('')
  const { data } = useAxiosQuery<{ data: { items: Dao[] } }, Dao[]>(
    '/v2/dao/list',
    {
      pageSize: 1000,
      filters: { category, name: { $regex: text, $options: 'i' } },
    },
    {
      select: (i) => i.data.items,
      keepPreviousData: true,
    }
  )
  return (
    <div>
      <div className="mt-20 mb-10">
        <DSIuput
          value={text}
          onChange={(e) => {
            setText(e.target.value)
          }}
        />
      </div>
      <div className="mb-2 mt-10 flex justify-between text-sm text-ds-600">
        <h3 className=" capitalize">{category}</h3>
      </div>
      <div className="mb-6 flex flex-wrap  gap-6">
        {data?.map((item) => {
          return (
            <IconCardLink
              key={item._id}
              title={item.name}
              icon={item.logo ?? ''}
              text={item.category}
              link={`/daos/${item._id}`}
            />
          )
        })}
      </div>
    </div>
  )
}

DaoMore.getLayout = (page) => <DaoLayout>{page}</DaoLayout>
DaoMore.getInitialProps = (ctx) => {
  return { category: String(ctx.query.category) }
}

export default DaoMore
