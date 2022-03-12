import { yupResolver } from '@hookform/resolvers/yup'
import CInput from 'components/c-input'
import { gql } from 'graphql-request'
import { useGqlMutation } from 'lib/request/use-gql-fetch'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { MeInterface } from 'types/user'
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

const ProfileForm: FC<{
  onSuccess: (va: FormData) => void
  id: string
  state: MeInterface
}> = ({ onSuccess, id, state: state }) => {
  // const { state, dispatch } = useContext(MeContext)
  const { email } = state
  const { handleSubmit, control } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: state,
    resolver: yupResolver(schema),
  })

  const { mutate } = useGqlMutation<FormData>(usrsMutateGql, {
    onSuccess: (_, va) => {
      onSuccess(va)
    },
  })

  const submit: SubmitType = mutate

  return (
    <form id={id} className="w-full max-w-lg" onSubmit={handleSubmit(submit)}>
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
  )
}

export default ProfileForm
