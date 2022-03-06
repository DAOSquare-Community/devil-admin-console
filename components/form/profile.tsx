import { yupResolver } from '@hookform/resolvers/yup'
import CInput from 'components/c-input'
import { ModalFooter, ModalFooterType, ModalMain } from 'components/modal'
import { gql } from 'graphql-request'
import MeContext from 'lib/me-provider'
import { useGqlMutation } from 'lib/request/use-gql-fetch'
import { FC, useContext } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup.string().required(),
  title: yup.string().required(),
})

type FormData = yup.InferType<typeof schema>
type SubmitType = (data: FormData) => void
const usrsMutateGql = gql`
  mutation updateUser($name: String!, $title: String!) {
    updateUser(name: $name, title: $title) {
      id
    }
  }
`

const ProfileForm: FC<ModalFooterType> = ({ onClose }) => {
  const { state, dispatch } = useContext(MeContext)
  const { email } = state
  const { handleSubmit, control } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: state,
    resolver: yupResolver(schema),
  })

  const { mutate } = useGqlMutation<undefined, FormData>(usrsMutateGql, {
    onSuccess: (_, va) => {
      dispatch({
        type: 'update',
        payload: va,
      })
      onClose && onClose()
    },
  })

  const submit: SubmitType = mutate

  return (
    <>
      <ModalMain>
        <form className="w-full max-w-lg">
          <div className="-mx-3 mb-6 flex flex-wrap">
            <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
              <CInput name="name" control={control} />
            </div>

            <div className="w-full px-3 md:w-1/2">
              <CInput name="title" control={control} />
            </div>
          </div>
          <div className="-mx-3 mb-6 flex flex-wrap">
            <div className="w-full px-3">
              <label
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                htmlFor="grid-password"
              >
                Email
              </label>
              <input
                className="dmc-form-input mb-3"
                type="email"
                disabled
                defaultValue={email}
              />
            </div>
          </div>
        </form>
      </ModalMain>
      <ModalFooter onClose={onClose} onSumbimit={handleSubmit(submit)} />
    </>
  )
}

export default ProfileForm
