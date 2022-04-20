import { ChakraComponent, Text } from '@chakra-ui/react'
import BaseCard from '../baseCard'

const IconCard: ChakraComponent<'div', { title: string }> = ({
  title,
  children,
}) => {
  return (
    <BaseCard p={0}>
      <Text fontSize="14px" color="#9D9CAF" p={4} py={3}>
        {title}
      </Text>
      {children}
    </BaseCard>
  )
}

export default IconCard
