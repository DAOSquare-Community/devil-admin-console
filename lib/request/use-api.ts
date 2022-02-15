import { LoginPostResponse, LoginPostReuqest } from './http-api-type'
import { useAPIService } from './use-http-service'

export const useLoginApi = () => {
  return useAPIService<LoginPostResponse, LoginPostReuqest>({
    key: '/api/sign',
    method: 'POST',
  })
}
