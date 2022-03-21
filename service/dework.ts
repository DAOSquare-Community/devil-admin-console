import { MsgCode } from 'types/const-enum'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import uuidBase62 from 'uuid-base62'
import { DeworkData, DeworkDataErrors } from 'types/models/dework'
import DaoService from 'service/dao'
import { request } from 'lib/request/axios-helper'
import { OpenApi } from 'models/Dao'

/**
 * Dework
 *
 * @export
 * @class Dework
 */
export default class Dework {
  private _url = 'https://api.dework.xyz/graphql'
  private _queryStatus = `
        query DAOSquareDashboardQuery($organizationId:UUID!) {
            organization:getOrganization(id:$organizationId) {
            tasks {
                id
                status
            }
            }
        }
        `

  public getDeworkData = async (daoId: string): Promise<DeworkData | null> => {
    let ret = null
    try {
      const dao = await new DaoService().getDaoInfo(daoId)
      if (!dao.message) {
        const orgId = (dao.data?.open_api as OpenApi).dework?.orgId

        if (!!orgId?.length) {
          const retDework = await request<{
            data?: DeworkData
            error?: DeworkDataErrors
          }>({
            url: this._url,
            method: 'POST',
            payload: {
              query: this._queryStatus,
              variables: {
                organizationId: uuidBase62.decode(orgId),
              },
            },
          })

          if (retDework.error) {
            throw new Error(retDework.error.Errors[0].message)
          } else {
            ret = retDework.data ?? null
          }
        }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : MsgCode.FAILURE
      throw new Error(message)
    }
    return ret
  }
}

// export { Dework }
