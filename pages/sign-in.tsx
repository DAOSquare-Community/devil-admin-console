import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useRouter } from 'next/router'
import Header from 'components/header'
import { NextPageWithLayout } from 'types/page'
import { NoSlideMenuLayout } from 'components/layout'
import { useAxiosMutation } from 'lib/request/use-fetch'
import { LoginPostResponse, LoginPostReuqest } from 'lib/request/http-api-type'
import { HomeRoute, SessionStorageKeys } from 'lib/config'
import CInput from 'components/c-input'

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
})

type FormData = yup.InferType<typeof schema>

type SubmitType = (data: FormData) => void

const LoginContainer: FC = ({ children }) => {
  return (
    <>
      <div className="flex min-h-full w-full items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <div className="flex items-center justify-center">
              <div className="inline-flex  transition-all duration-200">
                <span className=" text-5xl font-light lowercase	 ">Devil</span>
                <span className="text-5xl  uppercase italic text-yellow-400 ">
                  admin
                </span>
              </div>
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

const LoginForm: FC = () => {
  const router = useRouter()
  const { isLoading, mutate } = useAxiosMutation<
    LoginPostResponse,
    LoginPostReuqest
  >('/auth/sign-in', {
    onSuccess: () => {
      const prevUrl = sessionStorage.getItem(SessionStorageKeys.DEEP_URL_KEY)
      sessionStorage.removeItem(SessionStorageKeys.DEEP_URL_KEY)
      router.replace(prevUrl || HomeRoute)
    },
  })

  const onSubmit: SubmitType = mutate
  const {
    control,
    handleSubmit,
    // formState: { errors },
  } = useForm<FormData>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  })

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" name="remember" defaultValue="true" />
      <div className="-space-y-px rounded-md shadow-sm">
        <div className="mb-4">
          <CInput name="email" control={control} />
        </div>
        <div>
          <CInput name="password" control={control} />
        </div>
      </div>
      {/* 
      <div className="flex items-center justify-between">
        <div className="text-sm">
          <Link href="#">
            <a className="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </a>
          </Link>
        </div>
      </div> */}

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary w-full"
        >
          Sign in
        </button>
      </div>
    </form>
  )
}

const Login: NextPageWithLayout = () => {
  return (
    <LoginContainer>
      <Header />
      <LoginForm />
    </LoginContainer>
  )
}
Login.getLayout = (page) => <NoSlideMenuLayout>{page}</NoSlideMenuLayout>

export default Login
