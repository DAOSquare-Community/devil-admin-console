import { yupResolver } from '@hookform/resolvers/yup'
// import CInput from 'components/c-input'
import CSelect from 'components/c-select'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object().shape({
  // name: yup.string().required(),
  role: yup.string().required(),
})

type FormData = yup.InferType<typeof schema>

export type UserFormData = FormData

const displayName = 'user-form'

const UserForm: FC<{
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
        {/* <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
          <CInput name="name" control={control} />
        </div> */}
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
          <CSelect name="role" control={control}>
            <option value="super-amdin">Super Admin</option>
            <option value="admin">Admin</option>
            <option value="member">member</option>
          </CSelect>
        </div>
      </div>
    </form>
  )
}

UserForm.displayName = displayName

export default UserForm
