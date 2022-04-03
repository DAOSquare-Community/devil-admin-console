import { yupResolver } from '@hookform/resolvers/yup'
// import CInput from 'components/c-input'
import CSelect from 'components/input/c-select'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { Role } from 'types/permission'
import * as yup from 'yup'

const schema = yup.object().shape({
  // name: yup.string().required(),
  role: yup
    .array(
      yup.object().shape({
        value: yup.string().required(),
        label: yup.string().required(),
      })
    )
    .min(1),
})

export const UserOptions: { value: Role; label: string }[] = [
  {
    value: 'super-admin',
    label: 'Super Admin',
  },
  {
    value: 'admin',
    label: 'Admin',
  },
  {
    value: 'member',
    label: 'Member',
  },
]

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
    <form id={id} className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="-mx-3 mb-6 flex flex-wrap">
        {/* <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
          <CInput name="name" control={control} />
        </div> */}
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
          <CSelect
            name="role"
            control={control}
            options={UserOptions}
            isMulti
          />
        </div>
      </div>
    </form>
  )
}

UserForm.displayName = displayName

export default UserForm
