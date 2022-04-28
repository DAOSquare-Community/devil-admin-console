import DaoForm from 'components/form/dao'
import Layout from 'components/admin-nav/layout'
import { useAxiosMutation } from 'lib/request/use-fetch'
import { useRouter } from 'next/router'
import { NextPageWithLayout } from 'types/page'
import ActivityForm from 'components/form/activity'
import { Activity } from 'models/activity'
// Define a default UI for filtering

const ActivityAdd: NextPageWithLayout = () => {
  const router = useRouter()
  const { mutate } = useAxiosMutation<Partial<Activity>>('/v2/activity', {
    onSuccess: () => {
      router.back()
    },
  })

  return (
    <>
      <ActivityForm
        onSubmit={(fData) => {
          mutate(fData)
        }}
      />
      <button className="btn btn-primary" form={DaoForm.displayName}>
        Submit
      </button>
    </>
  )
}

ActivityAdd.getLayout = (page) => <Layout title="Dao add">{page}</Layout>

export default ActivityAdd
