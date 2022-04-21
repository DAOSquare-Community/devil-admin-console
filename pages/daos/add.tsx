import DaoLayout from 'components/dao-square-nav/layout'
import { NextPageWithLayout } from 'types/page'
// import Link from 'next/link'

const Daos: NextPageWithLayout = () => {
  return (
    <div>
      <div className="  flex-center  flex flex-col rounded-xl bg-indigo-500 pt-[96px] pb-[158px]  text-white opacity-50">
        <h1 className="text-[44px] font-bold"> Coming soon!</h1>
        <div className="my-5 text-center text-[20px] text-white/[0.56]">
          You can submit your DAO here, and fully own it.
          <br /> Follow us to get the news on time.
        </div>
        <button className="btn border-0  bg-white font-medium capitalize text-indigo-500 hover:bg-white">
          Follow
        </button>
      </div>
    </div>
  )
}

Daos.getLayout = (page) => <DaoLayout>{page}</DaoLayout>

export default Daos
