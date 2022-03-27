import { Text } from '@chakra-ui/react'
import BaseCard from '../baseCard'

function IconCard({ title, children }) {
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
