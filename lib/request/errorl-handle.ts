import { AxiosError } from 'axios'
import { SessionStorageKeys } from 'lib/config'
import { toast } from 'react-toastify'

const signInPath = '/sign-in'

export type DMCError = AxiosError & {
  response: { error?: ''; errors?: { message: string }[] }
}

let LAST_PATH_NAME = ''
export const errorHandler = (error: DMCError) => {
  const { response } = error

  if (response) {
    const { status, statusText, data, errors } = response

    const errorMessage = errors?.map((e) => e.message).join('.\n')
    const errorText =
      errorMessage || response.error || data?.message || statusText
    console.log('errorText', errorText)

    // if (status === 404 && window.location.pathname !== '/404') {
    //   // window.location.href = '/404'
    // }

    if (status === 401 && window.location.pathname !== signInPath) {
      if (window.location.pathname !== '/404') {
        LAST_PATH_NAME = window.location.href
      }

      if (LAST_PATH_NAME !== signInPath) {
        sessionStorage.setItem(SessionStorageKeys.DEEP_URL_KEY, LAST_PATH_NAME)
      }

      return (window.location.href = signInPath)
    }
    toast.error(errorText)
    // return Promise.reject(errorText)
  }
}

export default errorHandler
