import { DaoPeopleLink } from 'components/card/peopleCard'
import DaoLayout from 'components/dao-square-nav/layout'
import DSIuput from 'components/input/ds-input'
import Link from 'next/link'
import { NextPageWithLayout } from 'types/page'
// import Link from 'next/link'

const peopleData = [
  { name: 'Jerome Bell', title: 'MetaCartel', link: '/daos/people/123' },
  { name: 'Jerome Bell2', title: 'MetaCartel', link: '/daos/people/123' },
  { name: 'Jerome Bell', title: 'MetaCartel', link: '/daos/people/123' },
  { name: 'Jerome Bell2', title: 'MetaCartel', link: '/daos/people/123' },
  { name: 'Jerome Bell5', title: 'MetaCartel' },
  { name: 'Jerome Bell6', title: 'MetaCartel' },
]

const peopleGroupData = [
  { name: 'Hot', value: peopleData },
  { name: 'Female', value: peopleData },
  { name: 'All', value: peopleData },
]

const People: NextPageWithLayout = () => {
  return (
    <div>
      <div className="mt-20 mb-10">
        <DSIuput />
      </div>
      {peopleGroupData.map((group) => {
        return (
          <>
            <div className="mb-2 mt-10 flex justify-between text-sm text-ds-600">
              <h3>{group.name}</h3>
              <Link href={'/daos/people/more'}>
                <a className="btn btn-ghost btn-xs rounded-md font-medium capitalize text-ds-600">
                  More
                </a>
              </Link>
            </div>
            <div className="mb-6 flex flex-wrap justify-between gap-y-6">
              {group.value.map((item) => {
                return <DaoPeopleLink key={item.name} {...item} />
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
