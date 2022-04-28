import { DaoPeopleLink } from 'components/card/peopleCard'
import DaoLayout from 'components/dao-square-nav/layout'
import DSIuput from 'components/input/ds-input'
import { useAxiosQuery } from 'lib/request/use-fetch'
import { Member } from 'models/Member'
import { Fragment, useState } from 'react'
import { NextPageWithLayout } from 'types/page'
import { PageData } from 'types/resultmsg'
// import Link from 'next/link'

const People: NextPageWithLayout = () => {
  const [text, setText] = useState('')
  const peopleGroupData: { name: string; value?: Member[] }[] = [
    { name: 'Hot' },
    { name: 'Female' },
    { name: 'All' },
  ]

  const { data: hotData } = useAxiosQuery<
    {
      data: PageData<Member>
    },
    PageData<Member>['items']
  >(
    '/v2/member/list',
    {
      page: 0,
      pageSize: 6,
      filters: {
        is_hot: true,
      },
    },
    {
      select: (sData) => {
        return sData.data.items
      },
    }
  )

  const { data: femaleData } = useAxiosQuery<
    {
      data: PageData<Member>
    },
    PageData<Member>['items']
  >(
    '/v2/member/list',
    {
      page: 0,
      pageSize: 12,
      filters: {
        gender: 'female',
      },
    },
    {
      select: (sData) => {
        return sData.data.items
      },
    }
  )

  const { data: allData } = useAxiosQuery<
    {
      data: PageData<Member>
    },
    PageData<Member>['items']
  >(
    '/v2/member/list',
    {
      page: 0,
      pageSize: 100,
      filters: {
        name: { $regex: text, $options: 'i' },
      },
    },
    {
      select: (sData) => {
        return sData.data.items
      },
      keepPreviousData: true,
    }
  )

  peopleGroupData[0].value = hotData ?? []
  peopleGroupData[1].value = femaleData ?? []
  peopleGroupData[2].value = allData ?? []

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
            <Fragment key={group.name}>
              {group.value && (
                <div className="mb-2 mt-10 flex justify-between text-sm text-ds-600">
                  <h3>{group.name}</h3>
                  {/* {group.value.length > 12 && (
                    <Link href={'/daos/people/more'}>
                      <a className="btn btn-ghost btn-xs rounded-md font-medium capitalize text-ds-600">
                        More
                      </a>
                    </Link>
                  )} */}
                </div>
              )}
              <div className="mb-6 flex flex-wrap  gap-6">
                {group.value?.map((item) => {
                  return (
                    <DaoPeopleLink
                      key={item.name}
                      name={item.name ?? ''}
                      title={item.daos[0] ?? ''}
                      link={`/daos/people/${item.wallet_address}`}
                    />
                  )
                })}
              </div>
            </Fragment>
          )
        })}
    </div>
  )
}

People.getLayout = (page) => <DaoLayout>{page}</DaoLayout>

export default People
