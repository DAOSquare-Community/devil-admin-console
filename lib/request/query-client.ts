import { QueryClient } from 'react-query'
import errorHandler from './errorl-handle'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: false,
      onError: errorHandler as (err: unknown) => void,
    },
    mutations: {
      retry: false,
      onError: errorHandler as (err: unknown) => void,
    },
  },
})

export default queryClient
