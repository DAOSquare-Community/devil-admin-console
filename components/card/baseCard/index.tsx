import { Box, ChakraComponent } from '@chakra-ui/react'

// eslint-disable-next-line @typescript-eslint/ban-types
const BaseCard: ChakraComponent<'div', {}> = ({ children, ...props }) => {
  return (
    <Box
      bg="#fff"
      borderRadius="10px"
      px={5}
      py={7}
      overflow="hidden"
      background="rgb(255,255,255,.8)"
      {...props}
    >
      {children}
    </Box>
  )
}

export default BaseCard
