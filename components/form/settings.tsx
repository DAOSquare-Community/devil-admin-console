import { yupResolver } from '@hookform/resolvers/yup'
import CInput from 'components/c-input'
import { gql } from 'graphql-request'
import { useGqlMutation } from 'lib/request/use-gql-fetch'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object().shape({
  newPassword: yup.string().required().min(6).label('New password'),
  password: yup.string().required().min(6).label('Confirm password'),
})

type FormData = yup.InferType<typeof schema>
type SubmitType = (data: FormData) => void

const usrsMutateGql = gql`
  mutation changeUserPassword($password: String!) {
    updateUser(password: $password) {
      id
    }
  }
`

const SettingsForm: FC<{
  id: string
  onSuccess: () => void
}> = ({ id, onSuccess }) => {
  const { handleSubmit, control, setError } = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  const { mutate } = useGqlMutation<{ password: string }>(usrsMutateGql, {
    onSuccess: () => {
      onSuccess()
    },
  })

  const submit: SubmitType = (data) => {
    if (data.newPassword === data.password) {
      mutate({ password: data.newPassword })
    } else {
      setError(
        'password',
        { message: 'Password does not match' },
        { shouldFocus: true }
      )
    }
  }

  return (
    <form id={id} className="w-full max-w-lg" onSubmit={handleSubmit(submit)}>
      {/* <div className="mb-6 ">
            <CInput
              name="oldPassword"
              label="old password"
              control={control}
              type="password"
            />
          </div> */}
      <div className="mb-6">
        <CInput
          name="newPassword"
          label="new password"
          control={control}
          type="password"
        />
      </div>

      <div className="mb-6">
        <CInput
          name="password"
          label="Confirm password"
          control={control}
          type="password"
        />
      </div>
    </form>
  )
}

export default SettingsForm
