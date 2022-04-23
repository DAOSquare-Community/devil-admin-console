import { yupResolver } from '@hookform/resolvers/yup'
import CInput from 'components/input/c-input'
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

const ProfileForm: FC<{
  onSuccess: (va: FormData) => void
  id: string
  state: MeInterface
  submit: SubmitType
}> = ({ submit, id, state: state }) => {
  // const { state, dispatch } = useContext(MeContext)
  const { handleSubmit, control } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: state,
    resolver: yupResolver(schema),
  })

  return (
    <form id={id} className="w-full max-w-lg" onSubmit={handleSubmit(submit)}>
      <div className="-mx-3 mb-6 flex flex-wrap">
        <div className="mb-6 w-full px-3 md:mb-0 ">
          <CInput name="name" control={control} />
        </div>
      </div>
    </form>
  )
}

export default ProfileForm
