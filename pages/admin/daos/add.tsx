import DaoForm from 'components/form/dao'
import Layout from 'components/admin-nav/layout'
import { useAxiosMutation } from 'lib/request/use-fetch'
import { useRouter } from 'next/router'
import { NextPageWithLayout } from 'types/page'
import { Dao } from 'models/Dao'
// Define a default UI for filtering

const DaoAdd: NextPageWithLayout = () => {
  const router = useRouter()
  const { mutate } = useAxiosMutation<Partial<Dao>>('/v2/dao', {
    onSuccess: () => {
      router.back()
    },
  })

  return (
    <>
      <DaoForm
        onSubmit={(fData) => {
          mutate({
            daoId: fData.daoId,
            name: fData.name,
            profile: fData.profile,
            category: fData.category,
            logo: fData.logo,
            open_api: fData.open_api,
            start_time: new Date(),
            is_hot: fData.is_hot ?? false,
            offical_links: [
              { type: 'twitter', link_text: fData.twitter_url ?? '' },
              { type: 'website', link_text: fData.website_url ?? '' },
              { type: 'discord', link_text: fData.discord_url ?? '' },
            ],
          })
        }}
      />
      <button className="btn btn-primary" form={DaoForm.displayName}>
        Submit
      </button>
    </>
  )
}

DaoAdd.getLayout = (page) => <Layout title="Dao add">{page}</Layout>

export default DaoAdd
