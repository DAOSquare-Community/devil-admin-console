import { yupResolver } from '@hookform/resolvers/yup'
import CInput from 'components/input/c-input'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup.string().required(),
  profile: yup.string().required(),
  category: yup.string().required(),
  logo: yup.string().required(),
  twitter_url: yup.string().required(),
  website_url: yup.string().required(),
  discord_url: yup.string().required(),

  twitter_id: yup.string(),
  sesh_guild_id: yup.string(),
  sesh_access_token: yup.string(),
  discord_channel: yup.string(),
  dework_org_id: yup.string(),
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
    <form
      id={id}
      className="w-full  max-w-5xl"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="-mx-3 mb-6 flex flex-wrap">
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
          <CInput name="name" control={control} />
        </div>
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
          <CInput name="profile" control={control} />
        </div>
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
          <CInput name="category" control={control} />
        </div>
      </div>
      <div className="-mx-3 mb-6 flex flex-wrap">
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
          <CInput name="logo" control={control} />
        </div>
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
          <CInput name="twitter_url" control={control} />
        </div>
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
          <CInput name="website_url" control={control} />
        </div>
      </div>
      <div className="-mx-3 mb-6 flex flex-wrap">
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
          <CInput name="discord_url" control={control} />
        </div>
      </div>
      <div className="mb-3  ">OPEN API</div>
      <div className="-mx-3 mb-6 flex flex-wrap">
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
          <CInput name="discord_channel" control={control} />
        </div>
      </div>
      <div className="-mx-3 mb-6 flex flex-wrap">
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
          <CInput name="sesh_guild_id" control={control} />
        </div>
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
          <CInput name="sesh_access_token" control={control} />
        </div>
      </div>
      <div className="-mx-3 mb-6 flex flex-wrap">
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
          <CInput name="dework_org_id" control={control} />
        </div>
      </div>
    </form>
  )
}

DaoForm.displayName = displayName

export default DaoForm
