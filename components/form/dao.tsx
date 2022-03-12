import { yupResolver } from '@hookform/resolvers/yup'
import CInput from 'components/c-input'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup.string().required(),
  profile: yup.string().required(),
})

type FormData = yup.InferType<typeof schema>

export type DaoFormData = FormData

const displayName = 'dao-form'

const DaoForm: FC<{
  onSubmit: (va: FormData) => void
  id?: string
  defaultValues?: Partial<FormData>
}> = ({ onSubmit, id = displayName, defaultValues }) => {
  // const { state, dispatch } = useContext(MeContext)
  const { handleSubmit, control } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues,
    resolver: yupResolver(schema),
  })

  return (
    <form id={id} className="w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
      <div className="-mx-3 mb-6 flex flex-wrap">
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
          <CInput name="name" control={control} />
        </div>
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
          <CInput name="profile" control={control} />
        </div>
      </div>
    </form>
  )
}

DaoForm.displayName = displayName

export default DaoForm
