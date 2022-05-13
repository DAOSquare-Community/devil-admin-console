import { withImageProxy } from '@blazity/next-image-proxy'

export default withImageProxy({
  whitelistedPatterns: [
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
  ],
})
