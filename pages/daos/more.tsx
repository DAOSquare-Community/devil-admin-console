import DaoLayout from 'components/dao-square-nav/layout'
import DSIuput from 'components/input/ds-input'
import { NextPageWithLayout } from 'types/page'
// import Link from 'next/link'
import incubator from 'public/assets/images/incubator.svg'
import dkp from 'public/assets/images/dkp.svg'
import daoscape from 'public/assets/images/daoscape.svg'
import nft4ever from 'public/assets/images/nft4ever.svg'
import { IconCardLink } from 'components/card/iconCard'

const productsData = [
  {
    icon: incubator,
    title: 'Incubator',
    text: 'Infrastructure',
  },
  {
    icon: dkp,
    title: 'DKP',
    text: 'Community Operation',
    link: 'https://www.dkp.land',
  },
  {
    icon: daoscape,
    title: 'DAOscape',
    text: 'Treasury',
  },
  {
    icon: nft4ever,
    title: 'NFT4ever',
    text: 'Equity Marketplace',
    link: '',
  },
]

const peopleGroupData = [{ name: 'Infrastructure', value: productsData }]

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
            </div>
            <div className="mb-6 flex flex-wrap justify-between gap-y-6">
              {group.value.map((item) => {
                return <IconCardLink key={item.title} {...item} />
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
