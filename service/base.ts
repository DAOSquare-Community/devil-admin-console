/* eslint-disable no-console */
import {
  BadRequestException,
  InternalServerErrorException,
} from '@storyofams/next-api-decorators'
import { ReturnModelType } from '@typegoose/typegoose'
import { AnyParamConstructor, BeAnObject } from '@typegoose/typegoose/lib/types'
import { MongoError } from 'mongodb'
import mongoose from 'mongoose'
import { MsgCode } from 'types/const-enum'
import { PageData, ResultMsg } from 'types/resultmsg'
import { ValidationError } from 'yup'

export default class BaseService<T, U extends AnyParamConstructor<unknown>> {
  protected model

  constructor(em: ReturnModelType<U, BeAnObject>) {
    this.model = em
  }

  /**
   * get the pages
   * @param page
   * @param pageSize
   * @param queryParams
   * @param sortParams
   * @returns
   */
  public getList = async (
    page: number,
    pageSize: number,
    queryParams: object,
    sortParams: object
  ): Promise<ResultMsg<PageData<T>>> => {
    // the start page
    const p = page <= 0 ? 1 : page
    const psize = pageSize <= 0 ? 1 : pageSize
    const start = (p - 1) * pageSize

    const pd: PageData<T> = {
      totalCount: 0,
      items: [],
    }
    const resMsg: ResultMsg<PageData<T>> = {}

    try {
      const count = await this.model.count(queryParams)
      const items = await this.model
        .find<T>(queryParams)
        .skip(start)
        .limit(psize)
        .sort(sortParams)
      pd.totalCount = count
      pd.items = items
      resMsg.data = pd
    } catch (err) {
      const errmsg = err instanceof Error ? err.message : MsgCode.FAILURE
      throw new InternalServerErrorException(errmsg)
    }

    return resMsg
  }

  /**
   * get Count
   *
   * @param filter
   * @returns
   */
  public getCount = async (filter: object): Promise<ResultMsg<number>> => {
    const ret: ResultMsg<number> = {
      message: '',
      data: 0,
    }
    try {
      const entity = await this.model.count(filter)
      if (!!entity) ret.data = entity
    } catch (err) {
      const errmsg = err instanceof Error ? err.message : MsgCode.FAILURE
      ////console.log('getCount--------')
      ////console.log(err)
      ret.message = errmsg
    }
    return ret
  }

  /**
   * get entity by id
   *
   * @param id
   * @returns
   */
  public getEntityById = async (id: string): Promise<ResultMsg<T | null>> => {
    const ret: ResultMsg<T | null> = {}
    try {
      const entity = await this.model.findById<T>(
        new mongoose.Types.ObjectId(id)
      )
      if (!!entity) ret.data = entity
    } catch (err) {
      const errmsg = err instanceof Error ? err.message : MsgCode.FAILURE
      //console.log('getEntityById--------')
      //console.log(err)
      ret.message = errmsg
    }
    return ret
  }

  /**
   * get entity
   *
   * @param filter
   * @returns
   */
  public getEntities = async (
    filter: object
  ): Promise<ResultMsg<T[] | null>> => {
    const ret: ResultMsg<T[] | null> = {}
    try {
      const entity = await this.model.find<T>(filter)
      if (!!entity) ret.data = entity
    } catch (err) {
      const errmsg = err instanceof Error ? err.message : MsgCode.FAILURE
      //console.log('getEntities--------')
      //console.log(err)
      ret.message = errmsg
    }
    return ret
  }

  /**
   * get entity
   *
   * @param filter
   * @returns
   */
  public getEntity = async (filter: object): Promise<ResultMsg<T | null>> => {
    const ret: ResultMsg<T | null> = {}
    try {
      const entity = await this.model.findOne<T>(filter)
      if (!!entity) ret.data = entity
    } catch (err) {
      const errmsg = err instanceof Error ? err.message : MsgCode.FAILURE
      //console.log('getEntity--------')
      //console.log(err)
      ret.message = errmsg
    }
    return ret
  }

  /**
   * update entity
   *
   * @param filter
   * @param updateData
   * @returns
   */
  public updateEntity = async (
    filter: object,
    updateData: object
  ): Promise<ResultMsg<boolean>> => {
    const retUpdate: ResultMsg<boolean> = {
      data: false,
    }
    try {
      await this.model.updateMany(filter, { $set: updateData })
      retUpdate.data = true
    } catch (err) {
      const errmsg = err instanceof Error ? err.message : MsgCode.FAILURE
      //console.log('updateEntity--------')
      //console.log(err)
      retUpdate.message = errmsg
    }
    return retUpdate
  }

  /**
   * delete entity
   *
   * @param filter
   * @returns
   */
  public deleteEntity = async (filter: object): Promise<ResultMsg<boolean>> => {
    const retDel: ResultMsg<boolean> = {
      data: false,
    }
    try {
      await this.model.deleteMany(filter)
      retDel.data = true
    } catch (err) {
      const errmsg = err instanceof Error ? err.message : MsgCode.FAILURE
      //console.log('deleteEntity--------')
      //console.log(err)
      retDel.message = errmsg
    }
    return retDel
  }

  /**
   * delete entity  by  ids
   *
   * @param Ids
   * @returns
   */
  public deleteEntityByIds = async (
    ids: string[]
  ): Promise<ResultMsg<boolean>> => {
    const retDel: ResultMsg<boolean> = {
      data: false,
    }
    try {
      const mIds = ids.map((value) => {
        return new mongoose.Types.ObjectId(value)
      })
      await this.model.deleteMany({ _id: { $in: mIds } })
      retDel.data = true
    } catch (err) {
      const errmsg = err instanceof Error ? err.message : MsgCode.FAILURE
      //console.log('deleteEntityByIds--------')
      //console.log(err)
      retDel.message = errmsg
    }
    return retDel
  }

  /**
   * insert a entity
   *
   * @param entity
   * @returns
   */
  public insertEntity = async (entity: T): Promise<ResultMsg<boolean>> => {
    try {
      await this.model.create(entity)
      return { data: true }
    } catch (err) {
      if (ValidationError.isError(err)) {
        throw new BadRequestException(err.message)
      } else {
        throw new InternalServerErrorException(MsgCode.FAILURE)
      }
    }
    return {}
  }

  /**
   * insert mutilate entities
   *
   * @param entity
   * @returns
   */
  public insertEntities = async (entity: T[]): Promise<ResultMsg<boolean>> => {
    const retInsertMutl: ResultMsg<boolean> = {
      data: false,
    }
    try {
      await this.model.insertMany(entity)
      retInsertMutl.data = true
    } catch (err) {
      const errmsg =
        err instanceof MongoError && err.code === 11000
          ? MsgCode.DUPLICATE_KEY
          : MsgCode.FAILURE
      //console.log('insertEntities--------')
      //console.log(err)
      retInsertMutl.message = errmsg
    }
    return retInsertMutl
  }
}
