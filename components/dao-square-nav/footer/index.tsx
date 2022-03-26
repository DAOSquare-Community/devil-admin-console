import { ComponentWithAs, Flex, FlexProps } from '@chakra-ui/react'
import Link from 'next/link'
import Image from 'next/image'
import discord from '../../../public/assets/images/discord.svg'
import twitter from '../../../public/assets/images/twitter.svg'
import dework from '../../../public/assets/images/dework.svg'
import forum from '../../../public/assets/images/forum.svg'

const Footer: ComponentWithAs<'div', FlexProps> = (props) => {
  return (
    <Flex
      h="120px"
      lineHeight="120px"
      justifyContent="center"
      alignItems="center"
      {...props}
    >
      <a
        href="https://discord.com/invite/daosquare"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="mx-4">
          <Image src={discord} alt="discord" />
        </div>
      </a>
      <a
        href="https://twitter.com/DAOSquare"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="mx-4">
          <Image src={twitter} alt="twitter" />
        </div>
      </a>
      <a
        href="https://app.dework.xyz/o/daosquare-5T2WcpGDJ3m6cOiG5ItJeL"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="mx-4">
          <Image src={dework} alt="dework" width={'16px'} height={'16px'} />
        </div>
      </a>
      <a
        href="https://forum.daosquare.io/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="mx-4">
          <Image src={forum} alt="forum" width={'18px'} height={'18px'} />
        </div>
      </a>
    </Flex>
  )
}

export default Footer
