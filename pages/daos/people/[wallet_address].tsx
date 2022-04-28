import { useEffect } from 'react'
import { Box, Container, Flex, Text, useMediaQuery } from '@chakra-ui/react'

import Image from 'next/image'
import { Timeline } from 'react-twitter-widgets'
import BaseCard from 'components/card/baseCard'

import incubator from 'public/assets/images/incubator.svg'
import dkp from 'public/assets/images/dkp.svg'
import daoscape from 'public/assets/images/daoscape.svg'
import nft4ever from 'public/assets/images/nft4ever.svg'

import daosquare from 'public/assets/images/daosquare.svg'
import twitter from 'public/assets/images/twitter1.svg'
import DaoLayout from 'components/dao-square-nav/layout'
import { NextPageWithLayout } from 'types/page'
import { useAxiosQuery } from 'lib/request/use-fetch'
import { Member } from 'models/Member'
import { Dao } from 'models/Dao'
import { ResultMsg } from 'types/resultmsg'
import { IconCardLink } from 'components/card/iconCard'
// import Link from 'next/link'

const productsData = [
  {
    icon: incubator,
    title: 'Incubator',
    text: 'Infrastructure',
  },
  {
    icon: dkp,
    title: 'DKP',
    text: 'Community Operation',
    link: 'https://www.dkp.land',
  },
  {
    icon: daoscape,
    title: 'DAOscape',
    text: 'Treasury',
  },
  {
    icon: nft4ever,
    title: 'NFT4ever',
    text: 'Equity Marketplace',
    link: '',
  },
]

const Landscape: NextPageWithLayout<{ wallet_address: string }> = ({
  wallet_address,
}) => {
  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)')

  useEffect(() => {
    window.scrollTo(0, 0)

    const timer = setInterval(() => {
      const frame = document.querySelector('iframe')
      if (frame && frame.contentDocument) {
        clearInterval(timer)

        const head = frame.contentDocument.getElementsByTagName('head')[0]
        const style = document.createElement('style')
        style.innerText =
          'footer .u-floatLeft {display:none;}  .timeline-InformationCircle{display:none;}'
        head.append(style)
      }
    }, 500)
  }, [])

  const { data: member } = useAxiosQuery<{ data: Member[] }, Member>(
    `/v2/member`,
    {
      filter: { wallet_address },
    },
    { select: (s) => s.data?.[0] }
  )

  const social_links_map: Record<string, string> = {}
  member?.social_links.forEach((item) => {
    social_links_map[item.type] = item.link_text
  })

  const { data: daos = [] } = useAxiosQuery<ResultMsg<Dao[]>, Dao[]>(
    `/v2/member/daos`,
    {
      addr: wallet_address,
    },
    { select: (s) => s.data ?? [] }
  )

  return (
    <Box>
      <Container
        maxW="container.lg"
        p={0}
        mt={9}
        mb={{ base: '40px', md: '80px', lg: '120px' }}
        overflow="auto"
      >
        <Flex
          flexDir={{ base: 'column', md: 'row' }}
          alignItems="center"
          className="article"
        >
          <Box w="20%">
            <Image src={daosquare} width="140px" height={'140px'} alt="image" />
          </Box>
          <Box w="80%">
            <Box
              fontSize={{ base: '30px', md: '38px', lg: '48px' }}
              textAlign={{ base: 'center', md: 'left' }}
            >
              {member?.name}
            </Box>
            {!!member?.profile && <Text>{member?.profile}</Text>}
            <Flex justifyContent={{ base: 'center', md: 'left' }} mt={8}>
              {/* {social_links_map['discord']<a
                href="https://discord.com/invite/daosquare"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="mx-4">
                  <Image
                    src={discord}
                    alt="discord"
                    width={'20px'}
                    height={'15.83px'}
                  />
                </div>
              </a>} */}
              {!!social_links_map['twitter'] && (
                <a
                  href="https://twitter.com/DAOSquare"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="mx-4">
                    <Image
                      src={twitter}
                      alt="twitter"
                      width={'20px'}
                      height={'16.66px'}
                    />
                  </div>
                </a>
              )}
            </Flex>
          </Box>
        </Flex>
      </Container>

      {!!daos.length && (
        <>
          <Text as="h3" fontSize="14px" color="#4C4B63" mb={2} mt={10}>
            Daos
          </Text>
          <div className="mb-6 flex flex-wrap  gap-6">
            {daos?.map((item) => {
              return (
                <IconCardLink
                  key={item._id}
                  title={item.name}
                  icon={item.logo ?? ''}
                  text={item.category}
                  link={`/daos/${item.daoId}`}
                />
              )
            })}
          </div>
        </>
      )}

      <Text as="h3" fontSize="14px" color="#4C4B63" mb={2} mt={10}>
        News
      </Text>
      <Flex wrap="wrap" justifyContent="space-between" mb={16}>
        <Box w={{ base: '100%', md: '49%' }} mb={6}>
          <BaseCard p={0} className="click-card  h-[456px] xl:h-[610px]">
            <Timeline
              dataSource={{
                sourceType: 'profile',
                screenName: 'DAOSquare',
              }}
              options={{
                height: isLargerThan1280 ? '614' : '460',
              }}
            />
          </BaseCard>
        </Box>
        <Box w={{ base: '100%', md: '49%' }} mb={6}>
          <BaseCard p={0} className="click-card  h-[456px] xl:h-[610px]">
            <Timeline
              dataSource={{
                sourceType: 'profile',
                screenName: 'DAOSquare',
              }}
              options={{
                height: isLargerThan1280 ? '614' : '460',
              }}
            />
          </BaseCard>
        </Box>
      </Flex>

      <Box h={{ base: 8, md: 16, lg: 32 }} />
    </Box>
  )
}

Landscape.getLayout = (page) => <DaoLayout>{page}</DaoLayout>
Landscape.getInitialProps = (ctx) => {
  return { wallet_address: String(ctx.query.wallet_address) }
}

export default Landscape
