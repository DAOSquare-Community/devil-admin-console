import UserForm, { UserFormData, UserOptions } from 'components/form/account'
import Layout from 'components/nav/layout'
import { useAxiosMutation, useAxiosQuery } from 'lib/request/use-fetch'
import { User } from 'models/User'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { NextPageWithLayout } from 'types/page'
// Define a default UI for filtering

const DaoEdit: NextPageWithLayout = () => {
  const router = useRouter()
  const { id = '' } = router.query
  const { data, isFetching } = useAxiosQuery<{ data: User }>('/v2/user', {
    id: id,
  })
  const { mutate } = useAxiosMutation<{
    filter: { _id: string }
    update: Partial<User>
  }>(
    '/v2/user',
    {
      onSuccess: () => {
        router.back()
      },
    },
    'PUT'
  )
  const onSubmit = useCallback(
    (data: UserFormData) => {
      if (typeof id === 'string') {
        mutate({
          // name: data.name,
          filter: { _id: id },
          update: { role: data.role?.map((res) => res.value) },
        })
      }
    },
    [id, mutate]
  )

  if (isFetching) {
    return <div className=" abs-center before:spinner flex-center" />
  }

  return (
    <>
      <UserForm
        onSubmit={onSubmit}
        defaultValues={{
          role: UserOptions.filter((r) => data?.data?.role.includes(r.value)),
        }}
      />
      <button className="btn btn-primary" form={UserForm.displayName}>
        Submit
      </button>
    </>
  )
}

DaoEdit.getLayout = (page) => <Layout>{page}</Layout>

export default DaoEdit
