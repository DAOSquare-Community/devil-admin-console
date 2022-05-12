import {
  createHandler,
  InternalServerErrorException,
  Post,
  Req,
} from '@storyofams/next-api-decorators'

import { NextApiRequest } from 'next'
import DaoService from 'service/dao'
import MemberService from 'service/member'
import { LinksEnum, MsgCode } from 'types/const-enum'

import * as fs from 'fs'
import * as path from 'path'
import request from 'request'
import { Dao } from 'models/Dao'

class DaoHausDaosController {
  jsonUrl = 'https://daohaus-metadata.s3.amazonaws.com/daoMeta.json'
  jsonFileName = 'daoMeta.json'
  dir = 'download'
  private _daoService = new DaoService()
  private _memberService = new MemberService()

  // GET /api/cron/daohaus-daos
  @Post('/daos')
  public async executeCorn(@Req() req: NextApiRequest) {
    try {
      //   const { authorization } = req.headers
      //   if (authorization !== `Bearer ${process.env.API_SECRET_KEY}`)
      //     throw new ForbiddenException(MsgCode.AUTH_FAILED)

      this.getfileByUrl()
    } catch (err) {
      throw new InternalServerErrorException(
        err instanceof Error ? err.message : MsgCode.FAILURE
      )
    } // end for  try...catch

    //private
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static objToStrMap(obj: any) {
    const strMap = new Map()
    for (const k of Object.keys(obj)) {
      strMap.set(k, obj[k])
    }
    return strMap
  }

  static jsonToMap(jsonStr: string) {
    return this.objToStrMap(JSON.parse(jsonStr))
  }

  private getfileByUrl() {
    const pathFileName = path.join(this.dir, this.jsonFileName)

    // 0 判断目录是否存在，不存在就创建
    if (!fs.existsSync(this.dir)) {
      fs.mkdirSync(this.dir)
    }

    // 1 判断文件是否存在
    fs.access(pathFileName, fs.constants.F_OK, (err) => {
      // file not exists
      if (err) {
        this.download(pathFileName)
      } else {
        // file exists
        // 2 先备份文件
        fs.rename(pathFileName, `${pathFileName}_old`, (err) => {
          if (err) throw err
          // 3 再下载文件
          this.download(pathFileName)
        })
      }
    })
  }

  private download(pathFileName: string) {
    const stream = fs.createWriteStream(pathFileName)
    request(this.jsonUrl)
      .pipe(stream)
      .on('close', (err: Error) => {
        if (err) throw err
        //console.log(`文件${fileName}下载完毕`)
        // 4 读取文件内容
        fs.readFile(pathFileName, (err, data) => {
          if (err) throw err
          const jsonMap = DaoHausDaosController.jsonToMap(data.toString('utf8'))
          //console.log(jsonMap)
          // eslint-disable-next-line no-console
          console.log(jsonMap.size)
          this.saveData(jsonMap)
          // eslint-disable-next-line no-console
          //   console.log(
          //     jsonMap.get('0x8f56682a50becb1df2fb8136954f2062871bc7fc')[0].name
          //   )
        })
      })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private saveData(jsonMap: Map<any, any>) {
    jsonMap.forEach((value, key) => {
      this._daoService
        .getCount({
          'dao_contract.contract_address': {
            $regex: new RegExp(`^${key}`, 'i'),
          },
        })
        .then((data) => {
          if (data.data === 0 && value[0]) {
            try {
              const dao = new Dao()
              // 暂时使用contractAddress 代替
              dao.daoId = value[0].contractAddress
              dao.name = value[0].name
              dao.logo = value[0].avatarImg
              dao.profile = `${value[0].description}.${
                value[0].longDescription ?? ''
              }`
              dao.category = value[0].purpose
              // const links: OfficalLinks[] = []
              // links.push({
              //   type: LinksEnum.WebSite,
              //   link_text: value[0].links.website,
              // })
              dao.offical_links = [
                { type: LinksEnum.WebSite, link_text: value[0].links.website },
                { type: LinksEnum.Twitter, link_text: value[0].links.twitter },
                { type: LinksEnum.Discord, link_text: value[0].links.discord },
                {
                  type: LinksEnum.Telegram,
                  link_text: value[0].links.telegram,
                },
                { type: LinksEnum.Medium, link_text: value[0].links.medium },
              ]
              dao.dao_contract = {
                chain_type: value[0].network,
                contract_address: key,
              }
              this._daoService.insertEntity(dao)
            } catch (err) {
              throw err
              //continue
            }
          }
        })
    })
  }
}
export default createHandler(DaoHausDaosController)

// json example
// "0x12d913c76deaa584329b20bf10100a9736aa2ccc": [
//     {
//         "contractAddress": "0x12d913c76deaa584329b20bf10100a9736aa2ccc",
//         "network": "matic",
//         "name": "WAM DAO",
//         "description": "We Are Millions making awesome ideas happen.\n\n#privacy #interoperability #freedom",
//         "purpose": "Grants",
//         "version": "2.1",
//         "slug": "wam-dao",
//         "links": {
//             "website": "https://wearemillions.online/",
//             "twitter": "",
//             "discord": "",
//             "telegram": "",
//             "medium": "",
//             "other": ""
//         },
//         "proposalConfig": {
//             "playlists": [
//                 {
//                     "name": "Favorites",
//                     "id": "favorites",
//                     "forms": [
//                         "BUY_SHARES",
//                         "SHARES_FOR_WORK",
//                         "TOKEN",
//                         "GUILDKICK"
//                     ]
//                 },
//                 {
//                     "name": "The Classics",
//                     "id": "classics",
//                     "forms": [
//                         "MEMBER",
//                         "FUNDING",
//                         "TOKEN",
//                         "TRADE",
//                         "GUILDKICK",
//                         "LOOT_GRAB",
//                         "SIGNAL"
//                     ]
//                 }
//             ],
//             "allForms": {
//                 "name": "All Proposals",
//                 "id": "all",
//                 "forms": [
//                     "BUY_SHARES",
//                     "SHARES_FOR_WORK",
//                     "TOKEN",
//                     "GUILDKICK",
//                     "MEMBER",
//                     "FUNDING",
//                     "TRADE",
//                     "LOOT_GRAB",
//                     "SIGNAL"
//                 ]
//             },
//             "customData": null
//         },
//         "longDescription": "Peace, Love, Unity & Respect.",
//         "daosquarecco": 0,
//         "tags": [],
//         "settings": null,
//         "customThemeConfig": null,
//         "customTermsConfig": null,
//         "allies": [],
//         "logs": [
//             {
//                 "update": {
//                     "boostKey": "DISCORD",
//                     "metadata": [
//                         {
//                             "type": "discord",
//                             "channelId": "968528431371391016",
//                             "active": true,
//                             "actions": [
//                                 "votingPeriod",
//                                 "rageQuit",
//                                 "newProposal"
//                             ]
//                         }
//                     ]
//                 },
//                 "updatedBy": "0x11647DEf0Cc9E1E6C4d284bD442e17F4B66AC52b",
//                 "createdAt": "2022-04-26T16:00:29.000Z"
//             },
//             {
//                 "update": {
//                     "name": "WAM DAO",
//                     "description": "We Are Millions making awesome projects happen.\n\n#privacy #interoperability #freedom",
//                     "longDescription": "Peace, Love, Unity & Respect.",
//                     "purpose": "Grants",
//                     "tags": [
//                         ""
//                     ],
//                     "links": {
//                         "website": "https://wearemillions.online/",
//                         "twitter": "",
//                         "discord": "",
//                         "telegram": "",
//                         "medium": "",
//                         "other": ""
//                     }
//                 },
//                 "updatedBy": "0x82998A32CE20c87667D0591e37E6BEa502b3879D",
//                 "createdAt": "2022-05-04T11:15:30.000Z"
//             },
//             {
//                 "update": {
//                     "boostKey": "DISCOURSE",
//                     "metadata": {
//                         "name": "WAM DAO",
//                         "color": "10153d",
//                         "autoProposal": true
//                     }
//                 },
//                 "updatedBy": "0x11647DEf0Cc9E1E6C4d284bD442e17F4B66AC52b",
//                 "createdAt": "2022-04-26T15:50:43.000Z"
//             },
//             {
//                 "update": {
//                     "boostKey": "DISCOURSE",
//                     "metadata": {
//                         "name": "WAM DAO",
//                         "color": "10153d",
//                         "autoProposal": false,
//                         "categoryId": 258,
//                         "slug": "wam-dao"
//                     }
//                 },
//                 "updatedBy": "0x11647DEf0Cc9E1E6C4d284bD442e17F4B66AC52b",
//                 "createdAt": "2022-04-26T16:02:39.000Z"
//             },
//             {
//                 "update": {
//                     "name": "WAM DAO",
//                     "description": "We Are Millions making awesome projects happen.\n\n#privacy #interoperability #freedom",
//                     "longDescription": "Peace, Love, Unity & Respect.",
//                     "purpose": "Grants",
//                     "tags": [
//                         ""
//                     ],
//                     "links": {
//                         "website": "",
//                         "twitter": "",
//                         "discord": "",
//                         "telegram": "",
//                         "medium": "",
//                         "other": ""
//                     }
//                 },
//                 "updatedBy": "0x11647DEf0Cc9E1E6C4d284bD442e17F4B66AC52b",
//                 "createdAt": "2022-04-26T14:02:54.000Z"
//             },
//             {
//                 "update": {
//                     "name": "WAM DAO",
//                     "description": "We Are Millions",
//                     "longDescription": "",
//                     "purpose": "Grants",
//                     "tags": [
//                         ""
//                     ],
//                     "links": {
//                         "website": "",
//                         "twitter": "",
//                         "discord": "",
//                         "telegram": "",
//                         "medium": "",
//                         "other": ""
//                     }
//                 },
//                 "updatedBy": "0x11647DEf0Cc9E1E6C4d284bD442e17F4B66AC52b",
//                 "createdAt": "2022-04-25T22:07:28.000Z"
//             },
//             {
//                 "update": {
//                     "boostKey": "DAO_BOOKS",
//                     "metadata": {}
//                 },
//                 "updatedBy": "0x0FEc10b657470eCC48cf18C53B8eACD56656191e",
//                 "createdAt": "2022-04-26T14:44:25.000Z"
//             },
//             {
//                 "update": {
//                     "name": "WAM DAO",
//                     "description": "We Are Millions making awesome ideas happen.\n\n#privacy #interoperability #freedom",
//                     "longDescription": "Peace, Love, Unity & Respect.",
//                     "purpose": "Grants",
//                     "tags": [
//                         ""
//                     ],
//                     "links": {
//                         "website": "https://wearemillions.online/",
//                         "twitter": "",
//                         "discord": "",
//                         "telegram": "",
//                         "medium": "",
//                         "other": ""
//                     }
//                 },
//                 "updatedBy": "0x11647DEf0Cc9E1E6C4d284bD442e17F4B66AC52b",
//                 "createdAt": "2022-05-04T22:22:41.000Z"
//             }
//         ],
//         "boosts": {
//             "DISCOURSE": {
//                 "active": true,
//                 "metadata": {
//                     "name": "WAM DAO",
//                     "color": "10153d",
//                     "autoProposal": false,
//                     "categoryId": 258,
//                     "slug": "wam-dao"
//                 }
//             },
//             "DISCORD": {
//                 "active": true,
//                 "metadata": [
//                     {
//                         "type": "discord",
//                         "channelId": "968528431371391016",
//                         "active": true,
//                         "actions": [
//                             "votingPeriod",
//                             "rageQuit",
//                             "newProposal"
//                         ]
//                     }
//                 ]
//             },
//             "DAO_BOOKS": {
//                 "active": true,
//                 "metadata": {}
//             }
//         }
//     }
// ]}
