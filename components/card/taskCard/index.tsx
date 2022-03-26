import { Box, Flex, Text, Link } from '@chakra-ui/react'
import BaseCard from '../baseCard'
import Image from 'next/image'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TaskCard({ icon, title, text, color, data, link }: any) {
  return (
    <BaseCard p={{ base: 4, md: 8, lg: 12 }}>
      <Link href={link} target="_blank">
        <Flex>
          <div className="mr-2">
            <Image src={icon} width="60px" />
          </div>
          <Box>
            <Text fontSize="24px" fontWeight={900} color="#414152">
              {title}
            </Text>
            <Text fontSize="16px" color="#717186">
              {text}
            </Text>
          </Box>
        </Flex>
      </Link>
      <Flex
        wrap="wrap"
        justifyContent="left"
        mt={{ base: 4, md: 6, lg: 10 }}
        mb="-16px"
      >
        {data.map((d: { text: string; title: string }, i: number) => (
          <Box
            key={i}
            borderRadius="12px"
            px={{ base: 2, md: 3 }}
            py={2}
            background={color}
            width="28%"
            mr={(i + 1) % 3 === 0 ? 0 : '8%'}
            mb={4}
          >
            <Box
              fontSize={{ base: '14px', md: '16px', lg: '24px' }}
              fontWeight={900}
              color="#414152"
            >
              {d.title}
            </Box>
            <Box
              fontSize={{ base: '12px', lg: '14px' }}
              color="#9d9caf"
              height="22px"
              lineHeight="22px"
              overflow="hidden"
            >
              {d.text}
            </Box>
          </Box>
        ))}
      </Flex>
    </BaseCard>
  )
}

export default TaskCard
