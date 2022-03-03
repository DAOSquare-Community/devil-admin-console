import { yupResolver } from '@hookform/resolvers/yup'
import CInput from 'components/c-input'
import { ModalFooter, ModalFooterType, ModalMain } from 'components/modal'
import { gql } from 'graphql-request'
import { useGqlMutation } from 'lib/request/use-gql-fetch'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { UserType } from 'types/user'
import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup.string(),
  title: yup.string(),
  password: yup.string().min(6),
  email: yup.string().email(),
})

type FormData = yup.InferType<typeof schema>
type SubmitType = (data: FormData) => void
const usrsMutateGql = gql`
  mutation updateUser(
    $id: String!
    $name: String!
    $title: String!
    $password: String!
  ) {
    updateUser(id: $id, name: $name, title: $title, password: $password) {
      id
    }
  }
`

const AccountForm: FC<
  ModalFooterType & { user?: UserType; isEdit: boolean }
> = ({ onClose, user, isEdit }) => {
  const { handleSubmit, control } = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      name: user?.name,
      title: user?.title,
    },
  })

  const { mutate } = useGqlMutation<undefined, FormData>(usrsMutateGql, {
    onSuccess: () => {
      onClose && onClose()
    },
  })

  const submit: SubmitType = mutate

  return (
    <>
      <ModalMain>
        <form className=" w-full">
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
              <CInput name="password" control={control} />
            </div>

            {isEdit && (
              <div className="w-full px-3 md:w-1/2">
                <CInput name="email" control={control} />
              </div>
            )}
          </div>
        </form>
      </ModalMain>
      <ModalFooter onClose={onClose} onSumbimit={handleSubmit(submit)} />
    </>
  )
}

export default AccountForm
