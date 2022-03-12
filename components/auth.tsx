import MeContext, { meReducer } from 'lib/me-provider'
import { useSession } from 'next-auth/react'
import Router from 'next/router'
import { FC, useEffect, useReducer } from 'react'
import { MeInterface, UserType } from 'types/user'
import PermissionLayout from './nav/permission-layout'

const SignInLayout: FC<{ pathname: string }> = ({ children, pathname }) => {
  const [state, dispatch] = useReducer(meReducer, {} as MeInterface)
  const { data: session, status } = useSession()
  // useAxiosQuery<MeInterface>(
  //   '/auth/me',
  //   {},
  //   {
  //     onSuccess: (data) => dispatch({ type: 'update', payload: data }),
  //     refetchOnMount: true,
  //   }
  // )

  useEffect(() => {
    if (status === 'authenticated') {
      const user = session?.user as UserType
      // user.roles = ['super-admin']
      // if()
      if (user.roles && user.roles.length) {
        dispatch({ type: 'update', payload: user })
      } else {
        Router.replace('/401')
      }
    } else if (status === 'unauthenticated') {
      Router.replace('/login')
    }
  }, [session?.user, status])

  if (status === 'authenticated' && state.roles) {
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
