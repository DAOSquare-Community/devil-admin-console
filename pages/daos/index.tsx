import DaoLayout from 'components/dao-square-nav/layout'
import DSIuput from 'components/input/ds-input'
import { NextPageWithLayout } from 'types/page'
// import Link from 'next/link'
import { IconCardLink } from 'components/card/iconCard'
import { useState } from 'react'
import { useAxiosQuery } from 'lib/request/use-fetch'
import { Dao } from 'models/Dao'
import Link from 'next/link'

const useDaoQuery = (category: string) => {
  return useAxiosQuery<{ data: { items: Dao[] } }, Dao[]>(
    '/v2/dao/list',
    {
      pageSize: 8,
      filters: { category },
    },
    {
      select: (i) => i.data.items,
    }
  )
}

const People: NextPageWithLayout = () => {
  const [text, setText] = useState('')

  const peopleGroupData: { name: string; value?: Dao[] }[] = [
    { name: 'Infrastructure' },
    { name: 'Grant' },
    { name: 'Investment' },
    { name: 'Service' },
    { name: 'All' },
  ]
  const { data: infrastructure } = useDaoQuery('infrastructure')
  const { data: grant } = useDaoQuery('grant')
  const { data: investment } = useDaoQuery('investment')
  const { data: service } = useDaoQuery('service')
  peopleGroupData[0].value = infrastructure
  peopleGroupData[1].value = grant
  peopleGroupData[2].value = investment
  peopleGroupData[3].value = service

  const { data: all } = useAxiosQuery<{ data: { items: Dao[] } }, Dao[]>(
    '/v2/dao/list',
    {
      pageSize: 8,
      filters: { name: { $regex: text, $options: 'i' } },
    },
    {
      select: (i) => i.data.items,
      enabled: text.length > 0,
      keepPreviousData: true,
    }
  )
  peopleGroupData[4].value = text.length > 0 ? all : undefined

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
      {peopleGroupData
        .filter((i) => (text.length > 0 ? i.name === 'All' : true))
        .map((group) => {
          return (
            <>
              {!!group.value && !!group.value.length && text.length === 0 && (
                <div className="mb-2 mt-10 flex justify-between text-sm text-ds-600">
                  <h3>{group.name}</h3>
                  {group.value.length > 12 && (
                    <Link href={`/daos/more/${group.name}`}>
                      <a className="btn btn-ghost btn-xs rounded-md font-medium capitalize text-ds-600">
                        More
                      </a>
                    </Link>
                  )}
                </div>
              )}
              <div className="mb-6 flex flex-wrap  gap-6">
                {group.value?.map((item) => {
                  return (
                    <IconCardLink
                      key={item._id}
                      title={item.name}
                      icon={item.logo ?? ''}
                      imageProxy
                      text={item.category}
                      link={`/daos/${item.daoId}`}
                    />
                  )
                })}
              </div>
            </>
          )
        })}
    </div>
  )
}

People.getLayout = (page) => <DaoLayout>{page}</DaoLayout>

export default People
