import { yupResolver } from '@hookform/resolvers/yup'
import CInput from 'components/input/c-input'
import { FC, FormEventHandler } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object().shape({
  newPassword: yup.string().required().min(6).label('New password'),
  password: yup.string().required().min(6).label('Confirm password'),
})

type FormData = yup.InferType<typeof schema>

const SettingsForm: FC<{
  id: string
  onSubmit?: FormEventHandler<HTMLFormElement>
}> = ({ id, onSubmit }) => {
  const { handleSubmit, control, setError } = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  return (
    <form id={id} className="w-full max-w-lg" onSubmit={onSubmit}>
      {/* <div className="mb-6 ">
            <CInput
              name="oldPassword"
              label="old password"
              control={control}
              type="password"
            />
          </div> */}
      <div className="mb-6">
        <CInput
          name="newPassword"
          label="new password"
          control={control}
          type="password"
        />
      </div>

      <div className="mb-6">
        <CInput
          name="password"
          label="Confirm password"
          control={control}
          type="password"
        />
      </div>
    </form>
  )
}

export default SettingsForm
