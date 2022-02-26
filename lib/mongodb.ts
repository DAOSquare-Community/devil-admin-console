import mongoose, { Mongoose } from 'mongoose'

class DB {
  public client: Mongoose | null = null
  static instance: DB | null

  private uri: string
  private options: mongoose.ConnectOptions | undefined

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

  connection(): Promise<Mongoose> {
    return new Promise<Mongoose>((resolve, reject) => {
      if (!this.client) {
        mongoose
          .connect(this.uri, this.options)
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
}
export default DB
