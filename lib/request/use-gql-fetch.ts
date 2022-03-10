import { AxiosError } from 'axios'
import { request, Variables } from 'graphql-request'
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from 'react-query'

const GRAGHQL_BACKEND_URL = process.env.GRAGHQL_BACKEND_URL || ''

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type KeysType = any[] | string

export const useGqlQuery = <
  TQueryFnData = unknown,
  TData = TQueryFnData,
  TError = AxiosError
>(
  gql: string,
  payload?: Variables,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, KeysType>,
    'queryKey' | 'queryFn'
  >
) => {
  return useQuery<TQueryFnData, TError, TData, KeysType>(
    payload ? [gql, payload] : gql,
    async () => {
      return request(GRAGHQL_BACKEND_URL, gql, payload)
    },
    options
  )
}

export const useGqlMutation = <
  TVariables = Variables,
  TData = unknown,
  TContext = unknown,
  TError = AxiosError
>(
  gql: string,
  options?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    'mutationKey' | 'mutationFn'
  >
) => {
  return useMutation<TData, TError, TVariables, TContext>(
    gql,
    async (payload) => {
      return request(GRAGHQL_BACKEND_URL, gql, payload)
    },
    options
  )
}
