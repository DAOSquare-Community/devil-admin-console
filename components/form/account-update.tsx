import { yupResolver } from '@hookform/resolvers/yup'
import CInput from 'components/c-input'
import CSelect from 'components/c-select'
import { gql } from 'graphql-request'
import { useGqlMutation } from 'lib/request/use-gql-fetch'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { UserType } from 'types/user'
import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup.string().required(),
  title: yup.string().required(),
  password: yup.string().min(6).required(),
  email: yup.string().email().required(),
})

const schemaPatial = yup.object().shape({
  name: yup.string(),
  title: yup.string(),
  password: yup.string().min(6),
})

type FormData = yup.InferType<typeof schema>
type SubmitType = (data: FormData & { id?: string }) => void
const usrsUpdateGql = gql`
  mutation updateUser(
    $userId: ID
    $name: String
    $title: String
    $password: String
  ) {
    updateUser(
      userId: $userId
      name: $name
      title: $title
      password: $password
    ) {
      id
    }
  }
`

const usrsCreatGql = gql`
  mutation createUser(
    $name: String!
    $title: String!
    $password: String!
    $email: String!
  ) {
    createUser(name: $name, title: $title, password: $password, email: $email) {
      id
    }
  }
`

export type AccountFormType = {
  user?: UserType
  isEdit?: boolean
  onSuccess?: () => void
  id: string
}

const useAccountForm = ({ user, isEdit, onSuccess }: AccountFormType) => {
  const { handleSubmit, control } = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(isEdit ? schemaPatial : schema),
    defaultValues: {
      name: user?.name,
      title: user?.title ?? 'unknown',
    },
  })

  const { mutate } = useGqlMutation<FormData & { userId?: number }>(
    isEdit ? usrsUpdateGql : usrsCreatGql,
    {
      onSuccess: () => {
        toast.success(`Successfully ${isEdit ? 'updated' : 'added'}`)
        onSuccess && onSuccess()
      },
    }
  )

  const submit: SubmitType = (data) => {
    mutate({ ...data, userId: user?.id })
  }

  return { control, handleSubmit, submit }
}

const AccountForm: FC<AccountFormType> = (props) => {
  const { id, isEdit } = props
  const { control, handleSubmit, submit } = useAccountForm(props)
  return (
    <form className="  max-w-6xl" id={id} onSubmit={handleSubmit(submit)}>
      <div className="-mx-3 mb-6 flex flex-wrap">
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
          <CInput name="name" control={control} />
        </div>

        <div className="w-full px-3 md:w-1/2">
          <CInput name="title" control={control} />
        </div>
      </div>
      <div className="-mx-3 mb-6 flex flex-wrap">
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
          <CInput name="password" control={control} type="password" />
        </div>

        {/* <div className="w-full px-3 md:w-1/2">
          <CSelect
            name="role"
            control={control}
            options={[
              { label: 'tses', value: 'TEST' },
              { label: 'tses1', value: 'TEST2' },
            ]}
          />
        </div>
        <div className="-mx-3 mb-6 flex flex-wrap"> */}
        {!isEdit && (
          <div className="w-full px-3 md:w-1/2">
            <CInput name="email" control={control} />
          </div>
        )}
        {/* </div> */}
      </div>
    </form>
  )
}

export default AccountForm
