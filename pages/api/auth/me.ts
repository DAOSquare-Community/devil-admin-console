import { createHandler, Get } from '@storyofams/next-api-decorators'

class Handler {
  @Get()
  public me() {
    return { id: 1, roles: ['super-admin'] }
  }
}

export default createHandler(Handler)
