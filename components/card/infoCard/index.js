import { Link as RouterLink } from 'react-router-dom'
import { Box, Text, Image, Link } from '@chakra-ui/react'
import BaseCard from '../baseCard'

function InfoCard({ icon, title, text, link }) {
  return (
    <BaseCard>
      <Image src={icon} borderRadius="full" width="48px" />

      <Text fontSize="16px" fontWeight={900} color="#121127" mt={2}>
        {title}
      </Text>
      <Text
        noOfLines={4}
        fontSize="14px"
        lineHeight="24px"
        color="#4C4B63"
        height="96px"
        my="12px"
      >
        {text}
      </Text>
      <Box mb="-10px">
        <Link
          as={RouterLink}
          to={link}
          fontSize="14px"
          background="linear-gradient(107.76deg, #FF96D5 0.7%, #FFD390 99.85%)"
          backgroundClip="text"
        >
          {'Details ->'}
        </Link>
      </Box>
    </BaseCard>
  )
}

export default InfoCard
