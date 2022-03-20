import DaoForm from 'components/form/dao'
import Layout from 'components/admin-nav/layout'
import { DaoPostRequest } from 'lib/request/http-api-type'
import { useAxiosMutation } from 'lib/request/use-fetch'
import { useRouter } from 'next/router'
import { NextPageWithLayout } from 'types/page'
// Define a default UI for filtering

const DaoAdd: NextPageWithLayout = () => {
  const router = useRouter()
  const { mutate } = useAxiosMutation<DaoPostRequest>('/dao', {
    onSuccess: () => {
      router.back()
    },
  })

  return (
    <>
      <DaoForm onSubmit={mutate} />
      <button className="btn btn-primary" form={DaoForm.displayName}>
        Submit
      </button>
    </>
  )
}

DaoAdd.getLayout = (page) => <Layout title="Dao add">{page}</Layout>

export default DaoAdd
