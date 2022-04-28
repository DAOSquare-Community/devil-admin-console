import DaoForm, { OpenApiType } from 'components/form/dao'
import Layout from 'components/admin-nav/layout'
import { useAxiosMutation, useAxiosQuery } from 'lib/request/use-fetch'
import { Dao } from 'models/Dao'
import { useRouter } from 'next/router'
import { NextPageWithLayout } from 'types/page'
// Define a default UI for filtering

const DaoAdd: NextPageWithLayout = () => {
  const router = useRouter()
  const { id } = router.query
  const { data, isFetching } = useAxiosQuery<{ data: Dao }>(`/v2/dao`, {
    daoId: id,
  })
  const { mutate } = useAxiosMutation<{
    filter: { _id?: string }
    update: Partial<Dao>
  }>(
    '/v2/dao',
    {
      onSuccess: () => {
        router.back()
      },
    },
    'PUT'
  )

  const { data: dao } = data || {}

  if (isFetching) {
    return <div className=" abs-center before:spinner flex-center" />
  }
  return (
    <>
      <DaoForm
        onSubmit={(fData) => {
          mutate({
            filter: { _id: dao?._id },
            update: {
              daoId: fData.daoId,
              name: fData.name,
              profile: fData.profile,
              category: fData.category,
              logo: fData.logo,
              open_api: fData.open_api,
              last_update_at: new Date(),
              is_hot: fData.is_hot,
              offical_links: [
                { type: 'twitter', link_text: fData.twitter_url ?? '' },
                { type: 'website', link_text: fData.website_url ?? '' },
                { type: 'discord', link_text: fData.discord_url ?? '' },
              ],
            },
          })
        }}
        defaultValues={{
          ...dao,
          name: dao?.name,
          profile: dao?.profile ?? '',
          logo: dao?.logo ?? '',
          open_api: dao?.open_api as OpenApiType,
          twitter_url:
            dao?.offical_links.find((i) => i.type === 'twitter')?.link_text ??
            '',
          website_url:
            dao?.offical_links.find((i) => i.type === 'website')?.link_text ??
            '',
          discord_url:
            dao?.offical_links.find((i) => i.type === 'discord')?.link_text ??
            '',
        }}
      />
      <button className="btn btn-primary" form={DaoForm.displayName}>
        Submit
      </button>
    </>
  )
}

DaoAdd.getLayout = (page) => <Layout title="Dao Edit">{page}</Layout>

export default DaoAdd
