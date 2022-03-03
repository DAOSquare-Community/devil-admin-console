import { yupResolver } from '@hookform/resolvers/yup'
import CInput from 'components/c-input'
import { ModalFooter, ModalFooterType, ModalMain } from 'components/modal'
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

const SettingsForm: FC<ModalFooterType> = ({ onClose }) => {
  const { handleSubmit, control, setError } = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  const { mutate } = useGqlMutation<undefined, { password: string }>(
    usrsMutateGql,
    {
      onSuccess: () => {
        onClose && onClose()
      },
    }
  )

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
    <>
      <ModalMain>
        <form className="w-full max-w-lg">
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
      </ModalMain>
      <ModalFooter onClose={onClose} onSumbimit={handleSubmit(submit)} />
    </>
  )
}

export default SettingsForm
