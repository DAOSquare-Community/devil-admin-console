import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

import Button from './components/Button'

const overrides = {
  styles: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    global: (props: any) => ({
      body: {
        color: mode('#121127', 'whiteAlpha.900')(props),
      },
    }),
  },
  colors: {
    tip: '#CBC9C2',
  },
  components: {
    Button,
  },
}

export default extendTheme(overrides)
