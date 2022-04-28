import DaoForm from 'components/form/dao'
import Layout from 'components/admin-nav/layout'
import { useAxiosMutation, useAxiosQuery } from 'lib/request/use-fetch'
import { useRouter } from 'next/router'
import { NextPageWithLayout } from 'types/page'
import { Activity } from 'models/activity'
import ActivityForm from 'components/form/activity'
// Define a default UI for filtering

const ActivityAdd: NextPageWithLayout = () => {
  const router = useRouter()
  const { id } = router.query
  const { data, isFetching } = useAxiosQuery<{ data: Activity }>(
    `/v2/activity`,
    {
      id: id,
    }
  )
  const { mutate } = useAxiosMutation<{
    filter: { _id?: string }
    update: Partial<Activity>
  }>(
    '/v2/activity',
    {
      onSuccess: () => {
        router.back()
      },
    },
    'PUT'
  )

  const { data: activity } = data || {}

  if (isFetching) {
    return <div className=" abs-center before:spinner flex-center" />
  }
  return (
    <>
      <ActivityForm
        onSubmit={(fData) => {
          mutate({
            filter: { _id: activity?._id },
            update: fData,
          })
        }}
        defaultValues={activity}
      />
      <button className="btn btn-primary" form={DaoForm.displayName}>
        Submit
      </button>
    </>
  )
}

ActivityAdd.getLayout = (page) => <Layout title="Dao Edit">{page}</Layout>

export default ActivityAdd
