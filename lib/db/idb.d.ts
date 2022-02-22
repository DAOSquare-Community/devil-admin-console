/** mongodb DB interface */
import { Filter, UpdateFilter } from 'mongodb'

declare interface IDB {
  insert<T>(collection: string, doc: T): Promise<boolean>
  insertMany<T>(collection: string, docs: T[]): Promise<boolean>
  update<T>(
    collection: string,
    filter: Filter<T>,
    update: object
  ): Promise<boolean>
  delete<T>(collection: string, filter: Filter<T>): Promise<boolean>
  find<T>(collection: string, filter: Filter<T>): Promise<unknown[]>
  aggregate(collection: string, pipeline: object[]): Promise<unknown[]>
}
