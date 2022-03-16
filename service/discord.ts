import { MsgCode } from 'types/const-enum'
import { ResultMsg } from 'types/resultmsg'
import { DiscordData } from 'types/models/discord'
import DaoService from 'service/dao'
import { request } from 'lib/request/axios-helper'
import { OpenApi } from 'models/Dao'

/**
 * Discord
 *
 * @export
 * @class Discord
 */
export default class Discord {
  public getDiscordData = async (
    daoId: string
  ): Promise<ResultMsg<DiscordData | null>> => {
    const ret: ResultMsg<DiscordData | null> = {
      message: '',
      data: null,
    }
    try {
      const dao = await new DaoService().getDaoInfo(daoId)
      if (!dao.message) {
        const channelId = (dao.data?.open_api as OpenApi).discord?.channelId
        const discordAuth = (dao.data?.open_api as OpenApi).discord?.bot_token

        if (!!channelId?.length && !!discordAuth) {
          const retDiscord = await request<{
            props?: DiscordData | null
            err?: string
          }>({
            url: `https://discord.com/api/guilds/${channelId}?with_counts=true`,
            method: 'get',
            headers: {
              Authorization: `Bot ${discordAuth}`,
            },
          })

          if (retDiscord.err) {
            ret.message = retDiscord.err
          } else {
            ret.data = retDiscord.props
          }
        }
      }
    } catch (err) {
      ret.message = err instanceof Error ? err.message : MsgCode.FAILURE
    }
    return ret
  }
}
