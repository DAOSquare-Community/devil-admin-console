import Layout from 'components/layout'
import { NextPageWithLayout } from 'types/page'

const Accounts: NextPageWithLayout = () => {
  return <div>content</div>
}

Accounts.getLayout = (page) => <Layout>{page}</Layout>

export default Accounts
