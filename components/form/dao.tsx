import { yupResolver } from '@hookform/resolvers/yup'
import CInput from 'components/input/c-input'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const openApiScheme = yup.object().shape({
  dework: yup.object().shape({
    orgId: yup.string(),
  }),
  discord: yup.object().shape({
    channelId: yup.string(),
  }),
  sesh: yup.object().shape({
    access_token: yup.string(),
    guild_id: yup.string(),
  }),
  twitter: yup.object().shape({
    twitterId: yup.string(),
  }),
})

const schema = yup.object().shape({
  name: yup.string().required(),
  daoId: yup.string().required(),
  profile: yup.string(),
  category: yup.string(),
  logo: yup.string().required(),
  twitter_url: yup.string().url(),
  website_url: yup.string().url(),
  discord_url: yup.string().url(),
  open_api: openApiScheme,
})

type FormData = yup.InferType<typeof schema>
export type OpenApiType = yup.InferType<typeof openApiScheme>

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
          <CInput name="daoId" control={control} />
        </div>
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
          <CInput name="name" control={control} />
        </div>
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
          <CInput name="profile" control={control} />
        </div>
      </div>
      <div className="-mx-3 mb-6 flex flex-wrap">
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
          <CInput name="logo" control={control} />
        </div>
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
          <CInput name="category" control={control} />
        </div>
      </div>
      <div className=" divider my-10 uppercase">Office URL</div>
      <div className="-mx-3 mb-6 flex flex-wrap">
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
          <CInput name="twitter_url" label="twitter url" control={control} />
        </div>
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
          <CInput name="website_url" label="website url" control={control} />
        </div>
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/3">
          <CInput name="discord_url" label="discord url" control={control} />
        </div>
      </div>
      <div className=" divider my-10 uppercase ">OPEN API</div>
      <div className="-mx-3 mb-6 flex flex-wrap">
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
          <CInput
            name="open_api.discord.channelId"
            label="discord channelId"
            control={control}
          />
        </div>
      </div>
      <div className="-mx-3 mb-6 flex flex-wrap">
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
          <CInput
            name="open_api.sesh.guild_id"
            label="sesh guild Id"
            control={control}
          />
        </div>
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
          <CInput
            name="open_api.sesh.access_token"
            label="sesh access token"
            control={control}
          />
        </div>
      </div>
      <div className="-mx-3 mb-6 flex flex-wrap">
        <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
          <CInput
            name="open_api.discord.channelId"
            label="Discord ChannelId"
            control={control}
          />
        </div>
      </div>
    </form>
  )
}

DaoForm.displayName = displayName

export default DaoForm
