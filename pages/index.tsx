import Layout from 'components/nav/layout'
import { NextPageWithLayout } from 'types/page'
// Define a default UI for filtering

const Home: NextPageWithLayout = () => {
  return <div />
}

Home.getLayout = (page) => <Layout>{page}</Layout>

export default Home
