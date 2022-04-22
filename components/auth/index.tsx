import MeContext, { meReducer } from 'lib/me-provider'
import { useSession } from 'next-auth/react'
import Router from 'next/router'
import { FC, useEffect, useReducer } from 'react'
import { MeInterface } from 'types/user'
import PermissionLayout from './permission-layout'

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
      const user = session?.user
      // user.roles = ['super-admin']
      // if()
      if (user?.roles && user.roles.length) {
        dispatch({ type: 'update', payload: user })
      } else {
        // Router.replace('/401')
      }
    } else if (status === 'unauthenticated') {
      Router.replace('/')
    }
  }, [session?.user, status])

  if (status === 'authenticated' && state.roles) {
    return (
      <MeContext.Provider value={{ state, dispatch }}>
        <PermissionLayout pathname={pathname}>{children}</PermissionLayout>
      </MeContext.Provider>
    )
  }

  return <div className=" abs-center before:spinner flex-center" />
}

const SignCheckLayout: FC<{
  pathname: string
  signPathList?: string[]
}> = ({ children, pathname, signPathList }) => {
  if (pathname.startsWith('/admin') || signPathList?.includes(pathname)) {
    return <SignInLayout pathname={pathname}>{children}</SignInLayout>
  }
  return <>{children}</>
}

export default SignCheckLayout
