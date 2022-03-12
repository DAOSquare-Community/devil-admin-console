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
  const { mutate } = useAxiosMutation<Partial<UserType>>('/v2/user', {
    onSuccess: () => {
      router.back()
    },
  })
  const onSubmit = useCallback(
    (data: UserFormData) => {
      mutate({
        name: data.name,
        roles: [data.roles as Role],
      })
    },
    [mutate]
  )

  return (
    <>
      <UserForm onSubmit={onSubmit} />
      <button className="btn btn-primary" form={UserForm.displayName}>
        Submit
      </button>
    </>
  )
}

DaoEdit.getLayout = (page) => <Layout>{page}</Layout>

export default DaoEdit
