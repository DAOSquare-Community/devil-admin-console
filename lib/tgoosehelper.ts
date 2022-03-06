import {
  AnyParamConstructor,
  BeAnObject,
  IModelOptions,
} from '@typegoose/typegoose/lib/types'
import QueryHelpers, {
  getModelForClass,
  ReturnModelType,
  Severity,
} from '@typegoose/typegoose'

import DB from 'lib/mongodb'
export default class TgooseHelper {
  // get model for class by typegoose.getModelForClass
  public static getModelForClass<
    U extends AnyParamConstructor<unknown>,
    QueryHelpers = BeAnObject
  >(model: U, collectionName?: string): ReturnModelType<U, QueryHelpers> {
    // IModelOptions default
    let options = {
      options: { allowMixed: Severity.ALLOW },
    }

    //get single db instance
    const db = DB.getInstance()
    if (!!collectionName) {
      options = Object.assign(options, {
        schemaOptions: { collection: collectionName },
      })
    }
    return getModelForClass(model, options)
  }
}
