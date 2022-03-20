import DaoForm from 'components/form/dao'
import Layout from 'components/admin-nav/layout'
import { DaoPostRequest } from 'lib/request/http-api-type'
import { useAxiosMutation, useAxiosQuery } from 'lib/request/use-fetch'
import { Dao } from 'models/Dao'
import { useRouter } from 'next/router'
import { NextPageWithLayout } from 'types/page'
// Define a default UI for filtering

const DaoAdd: NextPageWithLayout = () => {
  const router = useRouter()
  const { id } = router.query
  const { data, isFetching } = useAxiosQuery<Dao>(`/dao/${id}`)
  const { mutate } = useAxiosMutation<DaoPostRequest>(
    '/dao',
    {
      onSuccess: () => {
        router.back()
      },
    },
    'PUT'
  )

  if (isFetching) {
    return <div className=" abs-center before:spinner flex-center" />
  }
  return (
    <>
      <DaoForm
        onSubmit={mutate}
        defaultValues={{ name: data?.name, profile: data?.profile ?? '' }}
      />
      <button className="btn btn-primary" form={DaoForm.displayName}>
        Submit
      </button>
    </>
  )
}

DaoAdd.getLayout = (page) => <Layout title="Dao Edit">{page}</Layout>

export default DaoAdd
