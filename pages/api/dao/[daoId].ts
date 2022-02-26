// get daosquare's treasury

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import ConfigService from 'service/config'
import DaoService from 'service/dao'
import { Dao } from 'models/Dao'
// import {
//   getDaoInfo,
//   updateDaoInfo,
//   deleteDaoInfo,
//   insertDaoInfo,
//   insertMutilDaoInfo,
// } from 'service/dao'

const DAOSquareInfo: Dao = {
  open_api: {
    dework: { orgId: '5T2WcpGDJ3m6cOiG5ItJeL44444' },
    discord: { channelId: '941665725112782868' },
    sesh: {
      access_token: 'ByVKQiG9sNSRgxiejvjcHcWSjghnIh',
      guild_id: '678414857510453309',
    },
    yyy: {
      aaa: 1243214,
      bb: 'asdfads',
    },
  },
} as Dao

const daoservice = new DaoService()

const dao1: Dao = {
  daoId: 'daohaus',
  name: 'DAOHaus', // DAO的名称
  logo: 'https://etherscan.io/token/images/daosquare_32.png', // DAO的logo
  profile: 'DAOHaus', // DAO简介
  category: 'Infrastructure', // DAO的分类
  founder: ['453786789', '679789780'], // DAO的创始人  Member._id
  start_time: new Date('2019-02-11T07:10:32.936+0000'), // DAO的成立时间
  offical_links: [
    {
      type: 'twitter', // 社交链接类型
      link_text: 'https://twitter.com/DAOSquare', // 社交链接地址
    },
    {
      type: 'website',
      link_text: 'https://www.daosquare.io/',
    },
    {
      type: 'discord',
      link_text: 'https://discord.gg/daosquare',
    },
  ], // 所属的dao
  dao_contract: {
    chain_type: 'xDai', // 链的类型
    contract_address: '0x1109136c32d6a2138dc0379b734d84ad0c2ffb1b', // 合约地址
  }, // DAO的合约地址
  treasury: {
    chain_type: 'Mainnet', // 链的类型
    contract_address: 'eth:0xf383975B49d2130e3BA0Df9e10dE5FF2Dd7A215a', // DAO的国库合约地址
    json_url:
      'https://safe-client.gnosis.io/v1/chains/1/safes/0xf383975B49d2130e3BA0Df9e10dE5FF2Dd7A215a/balances/USD?exclude_spam=true&trusted=false',
  }, // DAO的国库信息
  dao_token: {
    token_name: 'RICE', // 代币名称
    total_supply: '100000000', // 代币总供给
    token_contract: [
      {
        chain_type: 'Mainnet', // 链的类型
        contract_address: '0xbd9908b0cdd50386f92efcc8e1d71766c2782df0', // 合约地址
      },
      {
        chain_type: 'xDai', // 链的类型
        contract_address: '0x97Edc0e345FbBBd8460847Fcfa3bc2a13bF8641F', // 合约地址
      },
    ],
  }, // DAO的代币信息
  open_api: {
    // dework: {},
    // discord: {},
    // twitter: {},
  }, // 此DAO获取数据使用的openapi  ---- 需根据自身的类型构建结构
  create_at: new Date('2019-02-11T07:10:32.936+0000'), //创建时间
  last_update_at: new Date('2019-02-11T07:10:32.936+0000'), //上次更新时间
}

const dao2: Dao = {
  daoId: 'daosquare',
  name: 'DAOSquare', // DAO的名称
  logo: 'https://etherscan.io/token/images/daosquare_32.png', // DAO的logo
  profile: 'DAOSquare', // DAO简介
  category: 'Infrastructure', // DAO的分类
  founder: ['453786789', '679789780'], // DAO的创始人  Member._id
  start_time: new Date('2019-02-11T07:10:32.936+0000'), // DAO的成立时间
  offical_links: [
    {
      type: 'twitter', // 社交链接类型
      link_text: 'https://twitter.com/DAOSquare', // 社交链接地址
    },
    {
      type: 'website',
      link_text: 'https://www.daosquare.io/',
    },
    {
      type: 'discord',
      link_text: 'https://discord.gg/daosquare',
    },
  ], // 所属的dao
  dao_contract: {
    chain_type: 'xDai', // 链的类型
    contract_address: '0x1109136c32d6a2138dc0379b734d84ad0c2ffb1b', // 合约地址
  }, // DAO的合约地址
  treasury: {
    chain_type: 'Mainnet', // 链的类型
    contract_address: 'eth:0xf383975B49d2130e3BA0Df9e10dE5FF2Dd7A215a', // DAO的国库合约地址
    json_url:
      'https://safe-client.gnosis.io/v1/chains/1/safes/0xf383975B49d2130e3BA0Df9e10dE5FF2Dd7A215a/balances/USD?exclude_spam=true&trusted=false',
  }, // DAO的国库信息
  dao_token: {
    token_name: 'RICE', // 代币名称
    total_supply: '100000000', // 代币总供给
    token_contract: [
      {
        chain_type: 'Mainnet', // 链的类型
        contract_address: '0xbd9908b0cdd50386f92efcc8e1d71766c2782df0', // 合约地址
      },
      {
        chain_type: 'xDai', // 链的类型
        contract_address: '0x97Edc0e345FbBBd8460847Fcfa3bc2a13bF8641F', // 合约地址
      },
    ],
  }, // DAO的代币信息
  open_api: {
    dework: { orgId: '5T2WcpGDJ3m6cOiG5ItJeL' },
    discord: { channelId: '941665725112782868' },
    sesh: {
      access_token: '9xbD4YkcTJ22SQZy55CJzMfncII0X6',
      guild_id: '678414857510453309',
    },
  }, // 此DAO获取数据使用的openapi  ---- 需根据自身的类型构建结构
  create_at: new Date('2019-02-11T07:10:32.936+0000'), //创建时间
  last_update_at: new Date('2019-02-11T07:10:32.936+0000'), //上次更新时间
}

// type Data = {
//   updated: boolean
//   daoInfo: DAO
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
  // 读取
  // const { daoId } = req.query
  // if (typeof daoId === 'string') {
  //   const data = await new DaoService().getDaoInfo(daoId)
  //   if (!!data) {
  //     return res.status(200).json(data)
  //   }
  // }
  // return res.status(500).json(null)
  const { daoId } = req.query
  if (typeof daoId === 'string') {
    // 插入
    // const ret = await daoservice.insertDaoInfo(dao2)

    // 批量插入
    //const ret = await daoservice.insertMutilDaoInfo([dao1, dao2] as Dao[])

    // 更新
    const ret = await daoservice.updateDaoInfo(daoId, DAOSquareInfo)

    // 删除
    //const ret = await daoservice.deleteDaoInfo(daoId)

    // Config
    // const ret = await new ConfigService().insertConfig()

    if (!!ret) {
      return res.status(200).json(ret)
    }
  }
  return res.status(500).json(null)
}
