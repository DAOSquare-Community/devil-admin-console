import { MsgCode } from 'types/const-enum'
import { ResultMsg } from 'types/resultmsg'
import { TwitterData, TwitterResponse } from 'types/models/twitter'
import DaoService from 'service/dao'
import { request } from 'lib/request/axios-helper'
import { OpenApi } from 'models/Dao'

/**
 * Twitter
 *
 * @export
 * @class Twitter
 */
export default class Twitter {
  public getTwitterFollowersNumber = async (
    daoId: string
  ): Promise<ResultMsg<TwitterData | null>> => {
    const ret: ResultMsg<TwitterData | null> = {
      message: '',
      data: null,
    }
    try {
      const dao = await new DaoService().getDaoInfo(daoId)
      if (!dao.message) {
        const twitterId = (dao.data?.open_api as OpenApi).twitter?.twitterId
        const authorization =
          (dao.data?.open_api as OpenApi).twitter?.orbit_token ?? ''
        const path = (dao.data?.open_api as OpenApi).twitter?.orbit_path ?? ''

        if (!!twitterId?.length && !!authorization && !!path) {
          const retTwitter = await request<TwitterResponse | null>({
            url: `https://app.orbit.love/api/v1/${path}/members/${twitterId}`,
            method: 'get',
            headers: {
              Authorization: `Bearer ${authorization}`,
            },
          })

          ret.data = {
            twitter_followers:
              retTwitter?.data.attributes.twitter_followers ?? 0,
          }
        }
      }
    } catch (err) {
      ret.message = err instanceof Error ? err.message : MsgCode.FAILURE
    }
    return ret
  }
}
