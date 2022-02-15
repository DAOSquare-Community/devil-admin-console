import axios, { AxiosRequestConfig } from 'axios'

const client = axios.create()

const request = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: AxiosRequestConfig & { payload?: Record<string, any> }
) => {
  const { method = 'GET', payload, ...other } = options
  const mPayload =
    method.toLocaleLowerCase() === 'get'
      ? { params: payload }
      : { data: payload }
  const mOption = { ...mPayload, ...other, method }
  return axios(mOption).then((response) => response.data)
}
export { client, request }
