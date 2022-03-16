import { MsgCode } from 'types/const-enum'
import { ResultMsg } from 'types/resultmsg'
import { SeshData } from 'types/models/sesh'
import DaoService from 'service/dao'
import { request } from 'lib/request/axios-helper'
import { OpenApi } from 'models/Dao'

/**
 * Sesh
 *
 * @export
 * @class Sesh
 */
export default class Sesh {
  public seshApi = `https://sesh.fyi/api/get_event_listings`

  public getSeshData = async (
    daoId: string
  ): Promise<ResultMsg<SeshData | null>> => {
    const ret: ResultMsg<SeshData | null> = {
      message: '',
      data: null,
    }
    try {
      const dao = await new DaoService().getDaoInfo(daoId)
      if (!dao.message) {
        const sesh = (dao.data?.open_api as OpenApi).sesh
        if (!!sesh) {
          const retSesh = await request<{
            props?: SeshData | null
            err?: string
          }>({
            url: this.seshApi,
            method: 'post',
            payload: {
              access_token: sesh.access_token,
              token_type: 'Bearer',
              guild_id: sesh.guild_id,
            },
          })

          if (retSesh.err) {
            ret.message = retSesh.err
          } else {
            ret.data = retSesh.props
          }
        }
      }
    } catch (err) {
      ret.message = err instanceof Error ? err.message : MsgCode.FAILURE
    }
    return ret
  }
}
