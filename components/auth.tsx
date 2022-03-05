import { HomeRoute } from 'lib/config'
import MeContext, { meReducer } from 'lib/me-provider'
import errorHandler, { DMCError } from 'lib/request/errorl-handle'
import { useAxiosQuery } from 'lib/request/use-fetch'
import { useRouter } from 'next/router'
import { FC, useReducer } from 'react'
import { MeInterface } from 'types/user'
import PermissionLayout from './permission-layout'

const SignInLayout: FC<{ pathname: string }> = ({ children, pathname }) => {
  const [state, dispatch] = useReducer(meReducer, {} as MeInterface)
  useAxiosQuery<MeInterface>(
    '/auth/me',
    {},
    {
      onSuccess: (data) => dispatch({ type: 'update', payload: data }),
      refetchOnMount: true,
    }
  )
  if (state && Object.keys(state).length > 0) {
    return (
      <MeContext.Provider value={{ state, dispatch }}>
        <PermissionLayout pathname={pathname}>{children}</PermissionLayout>
      </MeContext.Provider>
    )
  }

  return (
    <div className="flex h-screen items-center justify-center ">
      <div className="h-10 w-10 animate-spin rounded-full border-t-4 border-b-4 border-green-900" />
    </div>
  )
}

const DontSignInLayout: FC = ({ children }) => {
  // const router = useRouter()
  // const { error } = useAxiosQuery(
  //   '/auth/status',
  //   {},
  //   {
  //     onError: (e: DMCError) => {
  //       const { response } = error || {}
  //       if (response) {
  //         const { status } = response
  //         if (status !== 401) errorHandler(e)
  //       }
  //     },
  //     onSuccess: () => {
  //       router.replace(HomeRoute)
  //     },
  //   }
  // )
  // if (error) {
  //   return <>{children}</>
  // }
  return <>{children}</>
  // return (
  //   <div className="flex h-screen items-center justify-center ">
  //     <div className="h-10 w-10 animate-spin rounded-full border-t-4 border-b-4 border-green-900" />
  //   </div>
  // )
}

const SignCheckLayout: FC<{
  pathname: string
  dontSignPathList?: string[]
}> = ({ children, pathname, dontSignPathList }) => {
  if (dontSignPathList?.includes(pathname)) {
    return <DontSignInLayout>{children}</DontSignInLayout>
  }
  return <SignInLayout pathname={pathname}>{children}</SignInLayout>
}

export default SignCheckLayout
