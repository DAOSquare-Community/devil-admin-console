import { yupResolver } from '@hookform/resolvers/yup'
import CInput from 'components/input/c-input'
import CSwitch from 'components/input/c-switch'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object().shape({
  title: yup.string().required(),
  img: yup.string().required(),
  location: yup.string().required(),
  start_at: yup.date().required(),
  link: yup.string().required(),
  is_active: yup.boolean().required(),
})

type FormData = yup.InferType<typeof schema>

export type DaoFormData = FormData

const displayName = 'dao-form'

const ActivityForm: FC<{
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
    <form
      id={id}
      className="w-full  max-w-5xl"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="-mx-3 mb-6 flex flex-wrap">
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
          <CInput name="title" control={control} />
        </div>
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
          <CInput name="img" control={control} />
        </div>
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
          <CInput name="location" control={control} />
        </div>
      </div>
      <div className="-mx-3 mb-6 flex flex-wrap">
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
          <CInput name="link" control={control} />
        </div>
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
          <CInput name="start_at" type={'datetime-local'} control={control} />
        </div>
      </div>
      <div className=" divider my-10 uppercase ">Activity</div>
      <div className="-mx-3 mb-6 flex flex-wrap">
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
          <CSwitch
            name="is_active"
            label="Switch To Activity"
            control={control}
          />
        </div>
      </div>
    </form>
  )
}

ActivityForm.displayName = displayName

export default ActivityForm
