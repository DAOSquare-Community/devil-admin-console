import {
  Get,
  Query,
  createHandler,
  DefaultValuePipe,
  InternalServerErrorException,
  Delete,
  Post,
  Put,
  Body,
} from '@storyofams/next-api-decorators'
import NextAuthGuard from 'lib/middleawares/auth'
import OpLogGuard from 'lib/middleawares/oplog'
import { ResultMsg } from 'types/resultmsg'
import DaoService from 'service/dao'
import { Dao, TokenContract } from 'models/Dao'
import axios from 'axios'
import { ChainEnum } from 'types/const-enum'
import Mainnetplorer from 'lib/onchain/mainnetplorer'
import XDaiplorer from 'lib/onchain/xdaiplorer'

type ChartHolderType = { name: string; value: number }

@OpLogGuard()
class DaoController {
  private _service = new DaoService()

  /**
   * get dao list
   * @param page
   * @param pageSize
   * @param queryParams
   * @param sortParams
   * @returns
   */

  /**
   * @swagger
   * /api/v2/dao/list:
   *   get:
   *     tags:
   *       - dao
   *     summary: get dao list
   *     parameters:
   *            - name: page
   *              required: false
   *              in: query
   *              type: number
   *            - name: pageSize
   *              required: false
   *              in: query
   *              type: number
   *            - name: queryParams
   *              required: false
   *              in: query
   *              type: object
   *            - name: sortParams
   *              required: false
   *              in: query
   *              type: object
   *
   *     responses:
   *       200:
   *         description: dao list
   *         content:
   *           application/json:
   *             schema:
   *               type: ResultMsg<PageData<Dao>>
   */
  @NextAuthGuard()
  @Get('/list')
  public async getDaoList(
    @Query('page', DefaultValuePipe(0)) page: number,
    @Query('pageSize', DefaultValuePipe(0)) pageSize: number,
    @Query('filters') filters?: string,
    @Query('sortBy') sortBy?: string
  ) {
    try {
      return await this._service.getList(
        page,
        pageSize,
        filters ? JSON.parse(filters) : {},
        sortBy ? JSON.parse(sortBy) : {}
      )
    } catch (error) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message)
      }
    }
  }

  /**
   * get dao by daoid
   * @Query daoid
   * @returns
   */
  /**
   * @swagger
   * /api/v2/dao:
   *   get:
   *     tags:
   *       - dao
   *     summary: get dao by daoid
   *     parameters:
   *            - name: daoId
   *              required: true
   *              in: query
   *              type: string
   *
   *     responses:
   *       200:
   *         description: dao object
   *         content:
   *           application/json:
   *             schema:
   *               type: ResultMsg<Dao | null>
   */
  @NextAuthGuard()
  @Get()
  public async getDaoByDaoId(
    @Query('daoId') daoId: string
  ): Promise<ResultMsg<Dao | null>> {
    const dao = await this._service.getEntity({ daoId })
    if (dao.message) throw new InternalServerErrorException(dao.message)
    return dao
  }

  @Get('/dkp')
  public async getDkpByDaoId(@Query('daoId') daoId: string) {
    const data = { dkp1: 0, dkp2: 0, dkp3: 0 }
    if (daoId.toLowerCase() === 'daosquare') {
      const urlParmas = ['0', '1', '2']
      const list = await Promise.all(
        urlParmas.map((r) =>
          axios
            .get(`http://47.241.24.129:3000/user/sumdkp/${r}`)
            .then((r) => r.data)
        )
      )
      data.dkp1 = list[0].sum
      data.dkp2 = list[1].sum
      data.dkp3 = list[2].sum

      return data
    }
    return data
  }

  @Get('/holders')
  public async getHoldersByTokenContracts(@Query('daoId') daoId: string) {
    const data: ChartHolderType[] = []
    const ps: Promise<number>[] = []
    const chains: string[] = []

    const dao = await this._service.getDaoInfo(daoId)

    // get holders
    if (dao.data && dao.data?.dao_token.token_contract) {
      const contracts = dao.data?.dao_token.token_contract
      const tc_count = contracts.length
      if (tc_count === 0) return data

      // for (let i = 0; i < tc_count; i++) {
      //   const p = this.getHoldersFunc(contracts[i])
      //   chains[i] = contracts[i].chain_type.toLowerCase()
      //   if (p) {
      //     ps.push(p)
      //   }
      // }

      // const vals = await Promise.all(ps)
      // for (let i = 0; i < tc_count; i++) {
      //   ch.push({ name: chains[i], value: vals[i] })
      // }
      // await Promise.all(ps).then((vals) => {
      //   // eslint-disable-next-line no-console
      //   console.log(`vals====>${vals}`)
      //   for (let i = 0; i < tc_count; i++) {
      //     ch.push({ name: chains[i], value: vals[i] })
      //   }
      // })

      for (let i = 0; i < tc_count; i++) {
        try {
          const p = this.getHoldersFunc(contracts[i])
          if (p) {
            const n = await p
            chains[i] = contracts[i].chain_type.toLowerCase()
            data.push({ name: chains[i], value: n })
          }
        } catch (err) {
          // TODO 获取链上holoders异常，暂不处理
          // eslint-disable-next-line no-console
          // console.log(`log====>${err}`)
        }
      }
    }
    return data
  }

  /**
   * delete dao by filter
   * @param filter
   * @returns
   */

  /**
   * @swagger
   * /api/v2/dao:
   *   delete:
   *     tags:
   *       - dao
   *     summary: delete dao by filter
   *     parameters:
   *            - name: filter
   *              required: true
   *              in: body
   *              type: object
   *
   *     responses:
   *       200:
   *         description: delete dao
   *         content:
   *           application/json:
   *             schema:
   *               type: ResultMsg<boolean>
   */
  @NextAuthGuard()
  @Delete()
  public async deleteDaoByFilter(
    @Body() body: { filter: string }
  ): Promise<ResultMsg<boolean>> {
    const del = await this._service.deleteEntity(JSON.parse(body.filter))
    if (del.message) {
      throw new InternalServerErrorException(del.message)
    }
    return del
  }

  /**
   * insert dao
   * @param dao
   * @returns
   */

  /**
   * @swagger
   * /api/v2/dao:
   *   post:
   *     tags:
   *       - dao
   *     summary: insert a dao
   *     parameters:
   *            - name: body
   *              required: true
   *              in: body
   *              type: object
   *
   *     responses:
   *       200:
   *         description: insert a dao
   *         content:
   *           application/json:
   *             schema:
   *               type: ResultMsg<boolean>
   */
  @NextAuthGuard()
  @Post()
  public async insertDao(@Body() body: object): Promise<ResultMsg<boolean>> {
    const dao = new Dao()
    const d = Object.assign(dao, body)
    const ret = await this._service.insertEntity(d)
    if (ret.message) {
      throw new InternalServerErrorException(ret.message)
    }
    return ret
  }

  /**
   * update dao
   * @param filter
   * @param update
   * @returns
   */

  /**
   * @swagger
   * /api/v2/dao:
   *   put:
   *     tags:
   *       - dao
   *     summary: update dao
   *     parameters:
   *            - name: body
   *              required: true
   *              in: body
   *              type: object
   *
   *     responses:
   *       200:
   *         description: update dao
   *         content:
   *           application/json:
   *             schema:
   *               type: ResultMsg<boolean>
   */
  @NextAuthGuard()
  @Put()
  public async updateDao(
    @Body() body: { filter: object; update: object }
  ): Promise<ResultMsg<boolean>> {
    const ret = await this._service.updateEntity(body.filter, body.update)
    if (ret.message) {
      throw new InternalServerErrorException(ret.message)
    }
    return ret
  }

  private getHoldersFunc(contract: TokenContract) {
    const chain = contract.chain_type.toLowerCase()
    let p: Promise<number> | undefined
    switch (chain) {
      case ChainEnum.Mainnet:
        p = Mainnetplorer.getInstance()?.getHoldersCount(
          contract.contract_address
        )
        break
      case ChainEnum.xDai:
        p = XDaiplorer.getInstance()?.getHoldersCount(contract.contract_address)
        break
      default:
        break
    }
    return p
  }
}

export default createHandler(DaoController)
