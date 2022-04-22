import { Box, ChakraComponent, Flex } from '@chakra-ui/react'
import BaseCard from '../baseCard'
import Image from 'next/image'
import { FC } from 'react'
import Link from 'next/link'

type IconCardProps = { icon: string; text: string; title: string }

const IconCard: ChakraComponent<'div', IconCardProps> = ({
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

export const IconCardLink: FC<IconCardProps & { link?: string }> = ({
  link,
  ...props
}) => {
  return (
    <div className=" w-full  md:w-[49%]  lg:w-[23.5%]">
      {link ? (
        <Link href={link}>
          <a rel="noopener noreferrer">
            <IconCard {...props} className="click-card" />
          </a>
        </Link>
      ) : (
        <IconCard {...props} className="click-card" />
      )}
    </div>
  )
}

export default IconCard
