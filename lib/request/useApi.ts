import { LoginPostResponse, LoginPostReuqest } from './HttpApiType'
import { useHTMAPIService } from './useHTMHttpService'

export const useLoginApi = () => {
  return useHTMAPIService<LoginPostResponse, LoginPostReuqest>({
    key: '/api/sign',
    method: 'POST',
  })
}
