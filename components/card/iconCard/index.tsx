import { Box, ChakraComponent, Flex } from '@chakra-ui/react'
import BaseCard from '../baseCard'
import Image from 'next/image'

const IconCard: ChakraComponent<'div', { icon: string; text: string }> = ({
  icon,
  title,
  text,
  ...props
}) => {
  return (
    <BaseCard {...props}>
      <Flex minW="200px" lineHeight="normal">
        <div className="mr-4">
          <Image src={icon} width={'60px'} height={'60px'} alt="image" />
        </div>
        <Box>
          <Box
            fontSize="22px"
            fontWeight={900}
            color="#414152"
            mt={1}
            height="26px"
            lineHeight="26px"
            overflow="hidden"
          >
            {title}
          </Box>
          <Box
            fontSize="14px"
            color="#9D9CAF"
            mt="6px"
            height="18px"
            lineHeight="18px"
            overflow="hidden"
          >
            {text}
          </Box>
        </Box>
      </Flex>
    </BaseCard>
  )
}

export default IconCard
