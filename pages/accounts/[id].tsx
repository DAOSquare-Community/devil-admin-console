import UserForm, { UserFormData } from 'components/form/account'
import { ScreenIndicator } from 'components/Indicator'
import Layout from 'components/nav/layout'
import { useAxiosMutation, useAxiosQuery } from 'lib/request/use-fetch'
import { User } from 'models/User'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { NextPageWithLayout } from 'types/page'
import { Role } from 'types/permission'
// Define a default UI for filtering

const DaoEdit: NextPageWithLayout = () => {
  const router = useRouter()
  const { id } = router.query
  const { data, isFetching } = useAxiosQuery<User>(`/v2/user/${id}`)
  const { mutate } = useAxiosMutation<Partial<User>>(
    '/dao',
    {
      onSuccess: () => {
        router.back()
      },
    },
    'PUT'
  )
  const onSubmit = useCallback(
    (data: UserFormData) => {
      mutate({
        // name: data.name,
        role: [data.role as Role],
      })
    },
    [mutate]
  )

  if (isFetching) {
    return <ScreenIndicator />
  }
  return (
    <>
      <UserForm
        onSubmit={onSubmit}
        defaultValues={{ role: data?.role?.[0] ?? '' }}
      />
      <button className="btn btn-primary" form={UserForm.displayName}>
        Submit
      </button>
    </>
  )
}

DaoEdit.getLayout = (page) => <Layout>{page}</Layout>

export default DaoEdit
