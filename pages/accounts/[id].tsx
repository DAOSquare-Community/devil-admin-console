import UserForm, { UserFormData } from 'components/form/account'
import { ScreenIndicator } from 'components/Indicator'
import Layout from 'components/nav/layout'
import { useAxiosMutation, useAxiosQuery } from 'lib/request/use-fetch'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { NextPageWithLayout } from 'types/page'
import { Role } from 'types/permission'
import { UserType } from 'types/user'
// Define a default UI for filtering

const DaoEdit: NextPageWithLayout = () => {
  const router = useRouter()
  const { id } = router.query
  const { data, isFetching } = useAxiosQuery<UserType>(`/v2/user/${id}`)
  const { mutate } = useAxiosMutation<Partial<UserType>>(
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
        name: data.name,
        roles: [data.roles as Role],
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
        defaultValues={{ name: data?.name, roles: data?.roles?.[0] ?? '' }}
      />
      <button className="btn btn-primary" form={UserForm.displayName}>
        Submit
      </button>
    </>
  )
}

DaoEdit.getLayout = (page) => <Layout>{page}</Layout>

export default DaoEdit
