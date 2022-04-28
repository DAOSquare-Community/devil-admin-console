import { Box, Flex, Text, Link, ChakraComponent } from '@chakra-ui/react'
import BaseCard from '../baseCard'
import Image from 'next/image'

type TaskCardProps = ChakraComponent<
  'div',
  {
    icon: string
    title: string
    text: string
    color: string
    data: { text: string; title?: string | number }[]
    link?: string
  }
>

const TaskCard: TaskCardProps = ({ icon, title, text, color, data, link }) => {
  return (
    <BaseCard p={{ base: 4, md: 8, lg: 12 }}>
      <Link href={link} target="_blank">
        <Flex>
          <div className="mr-2">
            <Image src={icon} width="60px" height={'60px'} alt="image" />
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
        {data.map((d, i) => (
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
              {d.title ?? 0}
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
