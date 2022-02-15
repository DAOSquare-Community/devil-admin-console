import axios, { AxiosRequestConfig } from 'axios'

const client = axios.create()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const request = (options: AxiosRequestConfig & { payload?: any }) => {
  const { method = 'GET', payload, ...other } = options
  const mPayload =
    method.toLocaleLowerCase() === 'get'
      ? { params: payload }
      : { data: payload }
  const mOption = { ...mPayload, ...other, method }
  return axios(mOption).then((response) => response.data)
}
export { client, request }
