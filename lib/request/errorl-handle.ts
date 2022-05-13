import { AxiosError } from 'axios'
import { SessionStorageKeys } from 'lib/config'
import { toast } from 'react-hot-toast'

const signInPath = '/'

export type DMCError = AxiosError & {
  response: { error?: ''; errors?: { message: string }[] }
}

let LAST_PATH_NAME = ''
let LAST_MESSAGE: string | undefined
export const errorHandler = (error: DMCError) => {
  const { response } = error

  if (response) {
    const { status, statusText, data, errors } = response

    const errorMessage = errors?.map((e) => e.message).join('.\n')
    const errorText =
      errorMessage || response.error || data?.message || statusText

    // if (status === 404 && window.location.pathname !== '/404') {
    //   // window.location.href = '/404'
    // }
    if ((!LAST_MESSAGE || LAST_MESSAGE !== errorText) && errorText) {
      toast.error(errorText)
    }

    if (status === 401 && window.location.pathname !== signInPath) {
      if (window.location.pathname !== '/404') {
        LAST_PATH_NAME = window.location.href
      }

      if (LAST_PATH_NAME !== signInPath) {
        sessionStorage.setItem(SessionStorageKeys.DEEP_URL_KEY, LAST_PATH_NAME)
      }
      // return (window.location.href = signInPath)
    }
    if (status === 401) {
      LAST_MESSAGE = errorText

      setTimeout(() => {
        LAST_MESSAGE = ''
      }, 2000)
    }
    // return Promise.reject(errorText)
  }
}

export default errorHandler
