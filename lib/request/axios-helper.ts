import axios, { AxiosRequestConfig } from 'axios'
const client = axios.create()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const request = <R = any>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: AxiosRequestConfig & { payload?: Record<string, any> }
): Promise<R> => {
  const { method = 'GET', payload, ...other } = options
  const mPayload =
    method.toLocaleLowerCase() === 'get'
      ? { params: payload }
      : { data: payload }
  const mOption: AxiosRequestConfig = {
    ...mPayload,
    ...other,
    method,
    // paramsSerializer: (params) => {
    //   console.log('qs', qs.stringify(params, { arrayFormat: 'comma' }))

    //   return qs.stringify(params, { arrayFormat: 'comma' })
    // },
  }

  return axios(mOption).then((response) => response.data)
}
export { client, request }
