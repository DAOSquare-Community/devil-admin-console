import {
  Filter,
  MongoClient,
  MongoClientOptions,
  UpdateFilter,
  OptionalUnlessRequiredId,
} from 'mongodb'
import { IDB } from './idb'

class DB implements IDB {
  public client: MongoClient | undefined
  static instance: DB | null

  private uri: string
  private options: MongoClientOptions

  /** get DB single instance */
  static getInstance(): DB | null {
    if (!DB.instance) {
      this.instance = new DB()
    }
    return this.instance
  }

  constructor() {
    this.uri = process.env.MONGODB_URI ?? ''
    this.options = !process.env.MONGODB_OPTIONS
      ? {}
      : JSON.parse(process.env.MONGODB_OPTIONS)

    this.connection()
  }

  connection(): Promise<MongoClient> {
    return new Promise<MongoClient>((resolve, reject) => {
      if (!this.client) {
        MongoClient.connect(this.uri, this.options)
          .then((client) => {
            this.client = client
            resolve(client)
          })
          .catch((err) => {
            reject(err)
          })
      } else {
        resolve(this.client)
      }
    })
  }

  /**
   * insert single entity
   *
   * @template T
   * @param {string} collection
   * @param {T} doc
   * @returns {Promise<boolean>}
   * @memberof DB
   */
  insert<T>(collection: string, doc: T): Promise<boolean> {
    return new Promise<boolean>((res, rej) => {
      this.connection().then((client) => {
        const db = client.db()
        db.collection<T>(collection)
          .insertOne(doc as OptionalUnlessRequiredId<T>)
          .then((data) => {
            if (!data || !data.acknowledged || !data.insertedId) {
              res(false)
            } else {
              res(true)
            }
          })
          .catch((e) => {
            res(false)
            rej(e)
          })
        //.finally(() => this.client?.close())
        // db.collection<T>(collection).insertOne(
        //   doc as OptionalUnlessRequiredId<T>,
        //   (err, result) => {
        //     if (err) {
        //       res(false)
        //       rej(err)
        //     } else {
        //       res(true)
        //     }
        //   }
        // )
      })
    })
  }

  /**
   * insert mutil entities
   *
   * @template T
   * @param {string} collection
   * @param {T[]} doc
   * @returns {Promise<boolean>}
   * @memberof DB
   */
  insertMany<T>(collection: string, docs: T[]): Promise<boolean> {
    return new Promise<boolean>((res, rej) => {
      this.connection().then((client) => {
        const db = client.db()
        db.collection<T>(collection)
          .insertMany(docs as OptionalUnlessRequiredId<T>[])
          .then((data) => {
            if (!data || !data.acknowledged || data.insertedCount <= 0) {
              res(false)
            } else {
              res(true)
            }
          })
          .catch((e) => {
            res(false)
            rej(e)
          })
        //.finally(() => this.client?.close())
        // db.collection<T>(collection).insertMany(
        //   docs as OptionalUnlessRequiredId<T>[],
        //   (err, result) => {
        //     if (err) {
        //       res(false)
        //       rej(err)
        //     } else {
        //       res(true)
        //     }
        //   }
        // )
      })
    })
  }

  /**
   * update single entity
   *
   * @template T
   * @param {string} collection
   * @param {Filter<T>} filter
   * @param { UpdateFilter<T>} update
   * @returns {Promise<boolean>}
   * @memberof DB
   */
  update<T>(
    collection: string,
    filter: Filter<T>,
    update: object
  ): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.connection().then((client) => {
        const db = client.db()
        db.collection(collection)
          .updateMany(filter, update)
          .then((data) => {
            if (
              !data ||
              !data.acknowledged ||
              (data.modifiedCount <= 0 && data.upsertedCount <= 0)
            ) {
              resolve(false)
            } else {
              resolve(true)
            }
          })
          .catch((e) => {
            resolve(false)
            reject(e)
          })
        //.finally(() => this.client?.close())
        // db.collection(collection).updateOne(filter, update, (err, result) => {
        //   if (err) {
        //     resolve(false)
        //     reject(err)
        //   } else {
        //     resolve(true)
        //   }
        // })
      })
    })
  }

  /**
   * delete entity
   *
   * @template T
   * @param {string} collection
   * @param {Filter<T>} filter
   * @returns {Promise<boolean>}
   * @memberof DB
   */
  delete<T>(collection: string, filter: Filter<T>): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.connection().then((client) => {
        const db = client.db()
        db.collection(collection)
          .deleteMany(filter)
          .then((data) => {
            if (!data || !data.acknowledged || data.deletedCount <= 0) {
              resolve(false)
            } else {
              resolve(true)
            }
          })
          .catch((e) => {
            resolve(false)
            reject(e)
          })
        // .finally(() => this.client?.close())
        // db.collection(collection).deleteOne(filter, (err, result) => {
        //   if (err) {
        //     resolve(false)
        //     reject(err)
        //   } else {
        //     resolve(true)
        //   }
        // })
      })
    })
  }

  /**
   * get entities by filter
   *
   * @template T
   * @param {string} collection
   * @param {Filter<T>} filter
   * @returns {Promise<unknown[]>}
   * @memberof DB
   */
  find<T>(collection: string, filter: Filter<T>): Promise<unknown[]> {
    return new Promise<unknown[]>((resolve, reject) => {
      this.connection().then((client) => {
        const db = client.db()
        db.collection(collection)
          .find(filter)
          .toArray()
          .then((data) => {
            resolve(data)
          })
          .catch((e) => reject(e))
        //.finally(() => this.client?.close())
      })
    })
  }

  /**
   * aggregate
   *
   * @param {string} collection
   * @param {object[]} pipeline
   * @returns {Promise<unknown[]>}
   * @memberof DB
   */
  aggregate<T>(collection: string, pipeline: T[]): Promise<unknown[]> {
    return new Promise<unknown[]>((resolve, reject) => {
      this.connection().then((client) => {
        const db = client.db()
        db.collection(collection)
          .aggregate(pipeline)
          .toArray()
          .then((docs) => {
            resolve(docs)
          })
          .catch((e) => reject(e))
        //.finally(() => this.client?.close())
      })
    })
  }
}

export default DB
