import { useState, useEffect } from 'react'
import { Box, Container, Flex, Text, useMediaQuery } from '@chakra-ui/react'
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'
import Image from 'next/image'
import { Timeline } from 'react-twitter-widgets'
import Calendar from '../../components/calendar'
import BaseCard from '../../components/card/baseCard'
import IconCard from '../../components/card/iconCard'
import TaskCard from '../../components/card/taskCard'
import TitleCard from '../../components/card/titleCard'

import incubator from '../../public/assets/images/incubator.svg'
import dkp from '../../public/assets/images/dkp.svg'
import daoscape from '../../public/assets/images/daoscape.svg'
import nft4ever from '../../public/assets/images/nft4ever.svg'

import dao2 from '../../public/assets/images/dao2.svg'
import devil from '../../public/assets/images/devil.svg'
import cafeteria from '../../public/assets/images/cafeteria.svg'
import matrix from '../../public/assets/images/matrix.svg'
import whaledao from '../../public/assets/images/whaledao.svg'

import daohaus from '../../public/assets/images/daohaus.svg'
import ceramic from '../../public/assets/images/ceramic.svg'
import brightid from '../../public/assets/images/brightid.svg'
import unlock from '../../public/assets/images/unlock.svg'
import multis from '../../public/assets/images/multis.svg'
import doingud from '../../public/assets/images/doingud.svg'
import home from '../../public/assets/images/home.svg'
import discord from '../../public/assets/images/discord1.svg'
import discord2 from '../../public/assets/images/discord2.svg'
import twitter2 from '../../public/assets/images/twitter2.svg'
import daosquare from '../../public/assets/images/daosquare.svg'
import daosquare2 from '../../public/assets/images/daosquare2.svg'
import dework1 from '../../public/assets/images/dework1.svg'
import dework from '../../public/assets/images/dework2.svg'
import dao from '../../public/assets/images/dao.svg'
import forum from '../../public/assets/images/forum1.svg'
import twitter from '../../public/assets/images/twitter1.svg'
import DaoLayout from '../../components/dao-square-nav/layout'
import { NextPageWithLayout } from 'types/page'
// import Link from 'next/link'

const chartData = [
  {
    name: 'Page A',
    uv: 50,
  },
  {
    name: 'Page B',
    uv: 42,
  },
  {
    name: 'Page C',
    uv: 56,
  },
  {
    name: 'Page D',
    uv: 50,
  },
  {
    name: 'Page end',
    uv: 70,
  },
  {
    name: 'Page F',
    uv: 58,
  },
  {
    name: 'Page G',
    uv: 70,
  },
]

const chartData1 = [
  { name: 'ETH', value: 1096 },
  { name: 'GC', value: 815 },
]

const data = [
  {
    icon: discord2,
    title: '13,100+',
    text: 'Members',
  },
  {
    icon: twitter2,
    title: '13,000+',
    text: 'Follower',
  },
  {
    icon: home,
    title: '$84,624,068', // Math.floor(96167102 * 0.879968526705165),https://etherscan.io/token/0xbd9908b0cdd50386f92efcc8e1d71766c2782df0#balances https://gnosis-safe.io/app/eth:0xf383975B49d2130e3BA0Df9e10dE5FF2Dd7A215a/balances
    text: 'Treasury',
  },
  {
    icon: daosquare2,
    title: '$0.88',
    text: 'Token Price',
  },
]

const taskData = [
  {
    icon: dework,
    title: 'Task',
    text: 'Tasks in Dework',
    color: 'rgba(255, 152, 211, 0.2)',
    link: 'https://app.dework.xyz/o/daosquare-5T2WcpGDJ3m6cOiG5ItJeL',
    data: [
      {
        title: '0',
        text: 'Backlog',
      },
      {
        title: '0',
        text: 'To Do',
      },
      {
        title: '0',
        text: 'In Progress',
      },
      {
        title: '0',
        text: 'In Review',
      },
      {
        title: '0',
        text: 'Done',
      },
    ],
  },
  {
    icon: dao,
    title: 'DAO',
    text: 'Governance in DAO',
    color: 'rgba(255, 214, 107, 0.2)',
    data: [
      {
        title: '0',
        text: 'Unsponsored',
      },
      {
        title: '0',
        text: 'Execution',
      },
      {
        title: '0',
        text: 'Grace',
      },
      {
        title: '0',
        text: 'Process',
      },
      {
        title: '0',
        text: 'Voting',
      },
      {
        title: '0',
        text: 'Passed',
      },
    ],
  },
]

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

const guildsData = [
  {
    icon: dao2,
    title: 'dao2',
    text: 'Media',
  },
  {
    icon: devil,
    title: 'DevilGuild',
    text: 'Developer',
  },
  {
    icon: cafeteria,
    title: 'Cafeteria',
    text: 'Governance',
  },
  {
    icon: matrix,
    title: 'Matrix',
    text: 'Development',
  },
  {
    icon: whaledao,
    title: 'WhaleDAO',
    text: 'Marketing',
  },
]

const portfolioData = [
  {
    icon: daohaus,
    title: 'DAOhause',
    text: 'Infrastructure',
    link: 'https://daohaus.club',
  },
  {
    icon: ceramic,
    title: 'Ceramic',
    text: 'Infrastructure',
    link: 'https://ceramic.network/',
  },
  {
    icon: brightid,
    title: 'BrightID',
    text: 'DID',
    link: 'https://www.brightid.org/',
  },
  {
    icon: unlock,
    title: 'Unlock',
    text: 'Tools',
    link: 'https://unlock-protocol.com/',
  },
  {
    icon: multis,
    title: 'Multis',
    text: 'Fund manager',
    link: 'https://multis.co/',
  },
  {
    icon: doingud,
    title: 'DoinGud',
    text: 'NFT',
    link: 'https://doingud.com/',
  },
]

const Landscape: NextPageWithLayout = () => {
  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)')

  const [price, setPrice] = useState(0)

  const [chartData0, setChartData0] = useState([])
  const [deworkData, setDeworkData] = useState({
    'TO DO': 0,
    'In Progress': 0,
    'In Review': 0,
  })
  const [eventsData, setEventsData] = useState([])

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

  useEffect(() => {
    fetch(
      `${process.env.DEVIL_CONSOLE_BACKEND_URL}/coingecko/marketchart/daosquare`
    )
      .then((res) => res.json())
      .then((res) => {
        const data = res.prices.reverse()
        setPrice(data[0][1])
        const graphData = data
          .slice(0, 7)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((d: any) => ({ date: d[0], value: d[1] }))
        setChartData0(graphData)
      })

    fetch('https://api.dework.xyz/graphql', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        query: `
                  query DAOSquareDashboardQuery($organizationId:UUID!) {
                    organization:getOrganization(id:$organizationId) {
                      tasks {
                        id
                        status
                      }
                    }
                  }
              `,
        variables: {
          organizationId: 'c174e43f-1ac8-432a-954f-43647236f6ff',
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const tasks = data.data.organization.tasks
        setDeworkData({
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          Suggestion: tasks.filter(
            (d: { status: string }) => d.status === 'BACKLOG'
          ).length,
          'TO DO': tasks.filter((d: { status: string }) => d.status === 'TODO')
            .length,
          'In Progress': tasks.filter(
            (d: { status: string }) => d.status === 'IN_PROGRESS'
          ).length,
          'In Review': tasks.filter(
            (d: { status: string }) => d.status === 'IN_REVIEW'
          ).length,
          Done: tasks.filter((d: { status: string }) => d.status === 'DONE')
            .length,
        })
      })

    getEventsData()
  }, [])

  async function getEventsData() {
    const response = await fetch(
      `${process.env.DEVIL_CONSOLE_BACKEND_URL}/sesh/daoquare`
    )
    const data = await response.json()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = data.map((d: any, i: number) => {
      const start = new Date(Date.parse(d.start_time))
      const end = new Date(Date.parse(d.end_time))
      return {
        id: i,
        name: d.event_name,
        start,
        end,
      }
    })
    setEventsData(result)
  }

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
              DAOSquare
            </Box>
            <Text>
              Born in MetaCartel, DAOSquare is an incubator for web3. It’s based
              on the concept of Web3 and runs on the Ethereum. It links resource
              via the thought of DAO to support any valuable innovations of this
              new era.
            </Text>
            <Flex justifyContent={{ base: 'center', md: 'left' }} mt={8}>
              <a
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
              </a>
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
              <a
                href="https://app.dework.xyz/o/daosquare-5T2WcpGDJ3m6cOiG5ItJeL"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="mx-4">
                  <Image
                    src={dework1}
                    alt="dework1"
                    width={'16px'}
                    height={'16px'}
                  />
                </div>
              </a>
              <a
                href="https://forum.daosquare.io/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="mx-4">
                  <Image
                    src={forum}
                    alt="forum"
                    width={'18px'}
                    height={'18px'}
                  />
                </div>
              </a>
            </Flex>
          </Box>
        </Flex>
      </Container>

      <Flex wrap="wrap" justifyContent="space-between" mb={8}>
        {data.map((d, i) => {
          const item = { ...d }
          item.title = i === 3 ? `$${price.toFixed(2)}` : d.title
          return (
            <Box
              key={i}
              w={{ base: '100%', md: '49%', lg: '23.5%' }}
              mb={{ base: 4, lg: 0 }}
            >
              <IconCard {...item} />
            </Box>
          )
        })}
      </Flex>

      <Flex wrap="wrap" justifyContent="space-between" mb={16}>
        <Box
          w={{ base: '100%', md: '49%', lg: '23.5%' }}
          mb={{ base: 4, lg: 0 }}
        >
          <TitleCard title="Market Cap">
            <Box
              px={4}
              fontSize="24px"
              fontWeight={900}
              height="36px"
              lineHeight="36px"
              overflow="hidden"
            >
              {/* {100000000 * price} */}
              $87,996,853.64
            </Box>
            <Box w="100%" h="220px">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  width={500}
                  height={400}
                  data={chartData0}
                  margin={{
                    top: 10,
                    right: 0,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#fff" stopOpacity={0.9} />
                      <stop offset="90%" stopColor="#FFD66B" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#FFD66B"
                    strokeWidth="3px"
                    filter="drop-shadow(0px 3px 5px rgba(32, 5, 5, 0.1))"
                    fill="url(#colorUv)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </TitleCard>
        </Box>
        <Box
          w={{ base: '100%', md: '49%', lg: '23.5%' }}
          mb={{ base: 4, lg: 0 }}
        >
          <TitleCard title="Stake">
            <Box
              px={4}
              fontSize="24px"
              fontWeight={900}
              height="36px"
              lineHeight="36px"
              overflow="hidden"
            >
              {/* ${170287.64912153248 * price} dkp2 池子数量 */}
              $149,847.77
            </Box>
            <Box w="100%" h="220px">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  width={500}
                  height={400}
                  data={chartData}
                  margin={{
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <defs>
                    <linearGradient id="color2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#fff" stopOpacity={0.9} />
                      <stop
                        offset="95%"
                        stopColor="rgba(183, 207, 254, 0.7)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="uv"
                    stroke="#5B93FF"
                    strokeWidth="3px"
                    filter="drop-shadow(0px 3px 5px rgba(0, 0, 0, 0.1))"
                    fill="url(#color2)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </TitleCard>
        </Box>
        <Box
          w={{ base: '100%', md: '49%', lg: '23.5%' }}
          mb={{ base: 4, lg: 0 }}
        >
          <TitleCard title="Holders">
            <Box w="100%" h="256px">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={60}>
                  <Pie
                    data={chartData1}
                    dataKey="value"
                    cx="50%"
                    cy="40%"
                    innerRadius={60}
                    outerRadius={80}
                  >
                    {chartData1.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          index === 0
                            ? '#AE8FF7'
                            : index === 1
                            ? '#FF96D5'
                            : 'grey'
                        }
                      />
                    ))}
                  </Pie>
                  <Legend
                    iconType="circle"
                    iconSize={10}
                    wrapperStyle={{ bottom: '20px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </TitleCard>
        </Box>
        <Box
          w={{ base: '100%', md: '49%', lg: '23.5%' }}
          mb={{ base: 4, lg: 0 }}
        >
          <TitleCard title="DKP">
            <Box p={4} h="256px">
              <Box fontSize="12px" color="#9d9caf" mt={1}>
                DKP1
              </Box>
              <Box fontSize="24px" fontWeight={900} color="#4C4B63" mb={5}>
                5,400.17
              </Box>
              <Box fontSize="12px" color="#9d9caf">
                DKP2
              </Box>
              <Box fontSize="24px" fontWeight={900} color="#4C4B63" mb={5}>
                17,121.92
              </Box>
              <Box fontSize="12px" color="#9d9caf">
                DKP3
              </Box>
              <Box fontSize="24px" fontWeight={900} color="#4C4B63">
                1,752
              </Box>
            </Box>
          </TitleCard>
        </Box>
      </Flex>

      <Flex wrap="wrap" justifyContent="space-between" mb={16}>
        {taskData.map((d, i) => (
          <Box key={i} w={{ base: '100%', lg: '49%' }} mb={{ base: 4, lg: 0 }}>
            <TaskCard
              {...d}
              className="click-card"
              data={
                i === 0
                  ? Object.keys(deworkData).map((k) => ({
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      //@ts-ignore
                      title: deworkData[k],
                      text: k,
                    }))
                  : d.data
              }
            />
          </Box>
        ))}
      </Flex>

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
          <BaseCard
            p={0}
            // h={isLargerThan1280 ? '610px' : '456px'}
            className=" click-card  h-[456px] xl:h-[610px]"
          >
            <Calendar
              isLargerThan1280={isLargerThan1280}
              eventsData={eventsData}
            />
          </BaseCard>
        </Box>
      </Flex>

      <Text as="h3" fontSize="14px" color="#4C4B63" mb={2} mt={10}>
        Products
      </Text>
      <Flex wrap="wrap" justifyContent="space-between">
        {productsData.map((d, i) => (
          <Box key={i} w={{ base: '100%', md: '49%', lg: '23.5%' }} mb={6}>
            {d.link ? (
              <a href={d.link} target="_blank" rel="noopener noreferrer">
                <IconCard {...d} className="click-card" />
              </a>
            ) : (
              <IconCard {...d} />
            )}
          </Box>
        ))}
      </Flex>

      <Text as="h3" fontSize="14px" color="#4C4B63" mb={2} mt={10}>
        Guilds
      </Text>
      <Flex wrap="wrap" justifyContent="space-between">
        {guildsData.map((d, i) => (
          <Box key={i} w={{ base: '100%', md: '49%', lg: '23.5%' }} mb={6}>
            <a
              href={`/guild#${d.title}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconCard {...d} className="click-card" />
            </a>
          </Box>
        ))}
      </Flex>

      <Text as="h3" fontSize="14px" color="#4C4B63" mb={2} mt={10}>
        Portfolio
      </Text>
      <Flex wrap="wrap" justifyContent="space-between">
        {portfolioData.map((d, i) => (
          <Box key={i} w={{ base: '100%', md: '49%', lg: '23.5%' }} mb={6}>
            <a href={d.link} target="_blank" rel="noopener noreferrer">
              <IconCard {...d} className="click-card" />
            </a>
          </Box>
        ))}
        <Box w={{ base: '100%', md: '49%', lg: '23.5%' }} mb={6}>
          <BaseCard visibility="hidden" />
        </Box>
        <Box w={{ base: '100%', md: '49%', lg: '23.5%' }} mb={6}>
          <BaseCard visibility="hidden" />
        </Box>
      </Flex>

      <Box h={{ base: 8, md: 16, lg: 32 }} />
    </Box>
  )
}

Landscape.getLayout = (page) => <DaoLayout>{page}</DaoLayout>

export default Landscape
