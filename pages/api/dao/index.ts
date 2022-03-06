import { createHandler, Get } from '@storyofams/next-api-decorators'
import DaoService from 'service/dao'
const daoservice = new DaoService()

class Handler {
  @Get()
  public daos() {
    return daoservice.getDaos().then((data) => ({
      data,
    }))
  }
}

export default createHandler(Handler)
