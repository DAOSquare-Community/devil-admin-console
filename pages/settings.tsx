import Layout from 'components/base/layout'
import { NextPageWithLayout } from 'types/page'

const Accounts: NextPageWithLayout = () => {
  return <div>content</div>
}

Accounts.getLayout = (page) => <Layout>{page}</Layout>

export default Accounts
