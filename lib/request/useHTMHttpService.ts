/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosRequestConfig } from 'axios'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import useSWR, { Key, mutate as gMutate, SWRConfiguration } from 'swr'
import { request } from './AxiosHelper'
import { HTMPathUnionType, UniqueAliasKeyType } from './HTMPathUnion'

type MethodStringType = 'GET' | 'POST' | 'PUT' | 'DELETE'
type LowercaseMethodType = 'get' | 'post' | 'put' | 'delete'

interface ServiceParamsType<P> {
  key: Key
  uniqueAliasKey?: UniqueAliasKeyType
  method?: MethodStringType | LowercaseMethodType
  payload?: P
}

interface OptionType<R> extends SWRConfiguration {
  headers?: Record<string, string>
  fetchOtherConfig?: AxiosRequestConfig
  enhance?: boolean
  dataMap?: (res: any) => R
  cachePolicy?: 'no-cache' | 'normal' | 'enhance'
}

const UniqueAliasKeyMap = new Map()

// Unified handling of errors.
// WARNING,Side effects:May cause confusion about data formats
const iDataMap = <R>(res: { message?: string; data?: R }) => {
  const { message, data } = res
  if (message && message !== 'success') {
    throw new Error(message)
  }
  if (data) {
    return data
  }
  return res as R
}

/*
 *  @R: response type;
 *  @P: payload type;
 *  @header: configure of http header ;
 *  @httpServiceConfig: other configure of request;
 *  @enhance: DefaultValue is true when method equal to GET,
 *            it will enhance some of the automatic trigger by payload;
 */
const useHTMHttpService = <R = unknown, P = unknown>(
  params: ServiceParamsType<P> | Key,
  options?: OptionType<R>
) => {
  const {
    key,
    method = 'GET',
    payload = undefined,
    uniqueAliasKey,
  } = params instanceof Object && !Array.isArray(params)
    ? (params as ServiceParamsType<P>)
    : { key: params, uniqueAliasKey: undefined }

  const iMethod = method.toUpperCase() as MethodStringType
  const { enhance = iMethod === 'GET', ...otherOptions } = options || {}
  const {
    headers,
    fetcher,
    fetchOtherConfig,
    revalidateOnMount = enhance,
    revalidateOnReconnect = enhance,
    refreshWhenHidden = false,
    refreshWhenOffline = false,
    revalidateOnFocus = false,
    shouldRetryOnError = false,
    revalidateIfStale = true,
    fallbackData,
    dataMap = iDataMap,
    cachePolicy = enhance ? 'enhance' : 'no-cache',
    ...other
  } = otherOptions

  const reqParams = { method, payload, headers, ...fetchOtherConfig }
  const refReqParams = useRef(reqParams)
  refReqParams.current = reqParams
  const iFetcher = (url: string) =>
    request({ url, ...reqParams })
      .then(dataMap)
      .catch((e) => Promise.reject(e))

  const [loading, setLoading] = useState(false)
  // Keep previous result while revalidating
  // https://github.com/vercel/swr/issues/192
  const lastDataRef = useRef<R>()
  const newDataRef = useRef<R>()
  const uniqRef = useRef(`${new Date().getTime()}`)
  const iKey = useMemo(() => {
    if (key === null || Array.isArray(key)) {
      return key
    }
    const enhanceKey =
      enhance && payload
        ? [key, iMethod, JSON.stringify(payload)]
        : [key, iMethod]
    if (cachePolicy === 'no-cache') {
      enhanceKey.push(uniqRef.current)
    }
    return enhanceKey
  }, [cachePolicy, enhance, iMethod, key, payload])

  // For glolal trigger
  useEffect(() => {
    if (uniqueAliasKey) {
      UniqueAliasKeyMap.set(uniqueAliasKey, iKey)
    }
    return () => {
      if (uniqueAliasKey) {
        UniqueAliasKeyMap.delete(uniqueAliasKey)
      }
    }
  }, [uniqueAliasKey, iKey])

  const { data, isValidating, mutate, ...rest } = useSWR<R, Error>(
    iKey,
    fetcher ?? iFetcher,
    {
      refreshWhenHidden,
      refreshWhenOffline,
      revalidateOnFocus,
      shouldRetryOnError,
      revalidateIfStale,
      revalidateOnMount,
      revalidateOnReconnect,
      fallbackData: fallbackData || lastDataRef.current,
      ...other,
    }
  )

  if (data !== undefined && cachePolicy === 'enhance') {
    lastDataRef.current = data
  }

  if (cachePolicy !== 'no-cache' || !isValidating) {
    newDataRef.current = data
  }

  //Manual Request For POST/PUT/DELETE
  const trigger = useCallback(
    (params: P) => {
      let url = iKey
      url = Array.isArray(url) ? url[0] : url
      if (typeof url === 'string') {
        setLoading(true)
        return request({
          url,
          ...refReqParams.current,
          payload: params,
        })
          .then((res) => dataMap(res))
          .finally(() => setLoading(false))
      }
    },
    [dataMap, iKey]
  )
  return {
    data: newDataRef.current,
    isValidating: isValidating || loading,
    mutate,
    trigger,
    ...rest,
  }
}

type SafeKey = HTMPathUnionType | (() => HTMPathUnionType)
// URL type safe & Less define
export const useHTMAPIService = <R = unknown, P = unknown>(
  params: (Omit<ServiceParamsType<P>, 'key'> & { key: SafeKey }) | SafeKey,
  options?: OptionType<R>
) => {
  const { fetchOtherConfig, ...other } = options || {}
  return useHTMHttpService<R, P>(params, {
    fetchOtherConfig: {
      baseURL: process.env.REST_BASE_URL,
      ...fetchOtherConfig,
    },
    ...other,
  })
}

// WARNING: Don't use the same key
export const globalTrigger = (uniqueKey: UniqueAliasKeyType) => {
  return gMutate(UniqueAliasKeyMap.get(uniqueKey))
}

type MutatorCallback<Data = any> = (
  currentValue: undefined | Data
) => Promise<undefined | Data> | undefined | Data
export const globalMutate = <Data = any>(
  uniqueKey: UniqueAliasKeyType,
  data?: Data | Promise<Data> | MutatorCallback<Data>,
  shouldRevalidate?: boolean
) => {
  return gMutate(UniqueAliasKeyMap.get(uniqueKey), data, shouldRevalidate)
}

// TODO :Pagination api

export default useHTMHttpService
