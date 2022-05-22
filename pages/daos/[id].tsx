import { useEffect } from 'react'
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
import Calendar from 'components/calendar'
import BaseCard from 'components/card/baseCard'
import IconCard from 'components/card/iconCard'
import TaskCard from 'components/card/taskCard'
import TitleCard from 'components/card/titleCard'
import { IconCardLink } from 'components/card/iconCard'
import daohaus from 'public/assets/images/daohaus.svg'
import ceramic from 'public/assets/images/ceramic.svg'
import brightid from 'public/assets/images/brightid.svg'
import unlock from 'public/assets/images/unlock.svg'
import multis from 'public/assets/images/multis.svg'
import doingud from 'public/assets/images/doingud.svg'
import home from 'public/assets/images/home.svg'
import discord from 'public/assets/images/discord1.svg'
import discord2 from 'public/assets/images/discord2.svg'
import twitter2 from 'public/assets/images/twitter2.svg'
import daosquare from 'public/assets/images/daosquare.svg'
import daosquare2 from 'public/assets/images/daosquare2.svg'
import dework1 from 'public/assets/images/dework1.svg'
import dework from 'public/assets/images/dework2.svg'
import dao from 'public/assets/images/dao.svg'
import forum from 'public/assets/images/forum1.svg'
import twitter from 'public/assets/images/twitter1.svg'
import DaoLayout from 'components/dao-square-nav/layout'
import { NextPageWithLayout } from 'types/page'
import { useAxiosQuery } from 'lib/request/use-fetch'
import { Dao } from 'models/Dao'
import { AggregateData } from 'types/models/aggregate'
import { GovernanceData } from 'service/governance'
import { DeworkStatsData } from 'types/models/dework'
// import Link from 'next/link'
function nFormatter(num: number): string {
  if (num >= 1000000000) {
    return `${(num / 1000000000).toFixed(1).replace(/\.0$/, '')}G`
  }
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1).replace(/\.0$/, '')}M`
  }
  // if (num >= 1000) {
  //   return `${(num / 1000).toFixed(1).replace(/\.0$/, '')}K`
  // }
  return num.toLocaleString()
}

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

// const chartData1 = [
//   { name: 'ETH', value: 1096 },
//   { name: 'GC', value: 815 },
// ]

const data = [
  {
    icon: discord2,
    title: '0',
    text: 'Members',
  },
  {
    icon: twitter2,
    title: '0',
    text: 'Follower',
  },
  {
    icon: home,
    title: '$0', // Math.floor(96167102 * 0.879968526705165),https://etherscan.io/token/0xbd9908b0cdd50386f92efcc8e1d71766c2782df0#balances https://gnosis-safe.io/app/eth:0xf383975B49d2130e3BA0Df9e10dE5FF2Dd7A215a/balances
    text: 'Treasury',
  },
  {
    icon: daosquare2,
    title: '$0',
    text: 'Token Price',
  },
]

const taskData = [
  {
    icon: dework,
    title: 'Task',
    text: 'Tasks in Dework',
    color: 'rgba(255, 152, 211, 0.2)',
    link: 'https://app.dework.xyz/o',
    data: [
      {
        key: 'suggestion',
        text: 'Suggestion',
      },
      {
        key: 'todo',
        text: 'Todo',
      },
      {
        key: 'progress',
        text: 'In Progress',
      },
      {
        key: 'inreview',
        text: 'In Review',
      },
      {
        key: 'done',
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
        key: 'unsponsored',
        text: 'Unsponsored',
      },
      {
        key: 'voting',
        text: 'Voting',
      },
      {
        key: 'grace',
        text: 'Grace',
      },
      {
        key: 'process',
        text: 'Process',
      },
      {
        key: 'excution',
        text: 'Excution',
      },
      {
        key: 'passed',
        text: 'Passed',
      },
    ],
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

const Landscape: NextPageWithLayout<{ daoId: string }> = ({ daoId }) => {
  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)')

  // const [eventsData, setEventsData] = useState([])

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

  const { data: dao } = useAxiosQuery<{ data: Dao }, Dao>(
    `/v2/dao`,
    {
      daoId: daoId,
    },
    { select: (s) => s.data }
  )
  const { data: dkp } = useAxiosQuery<{
    dkp1: number
    dkp2: number
    dkp3: number
  }>(
    `/v2/dao/dkp`,
    {
      daoId: daoId,
    }
    // { select: (s) => s.data }
  )

  const { data: ch } = useAxiosQuery<
    { data: { name: string; value: number } }[]
  >(
    `/v2/dao/holders`,
    {
      daoId: daoId,
    }
    // { select: (s) => s.data }
  )
  const chartData1 = ch ?? []

  const { data: gData } = useAxiosQuery<{ data: { items: Dao[] } }>(
    '/v2/dao/list',
    {
      pageSize: 1000,
      filters: { category: dao?.category, daoId: { $ne: daoId } },
    },
    {
      enabled: !!dao?.category.length,
    }
  )
  const guids = gData?.data.items ?? []

  const { data: aggregate } = useAxiosQuery<
    { data: AggregateData },
    AggregateData
  >(
    `/v2/aggregate`,
    {
      daoId: daoId,
    },
    { select: (s) => s.data }
  )
  data.forEach((i) => {
    if (i.text === 'Members') {
      i.title = nFormatter(aggregate?.governance?.members ?? 0)
    } else if (i.text === 'Follower') {
      i.title = nFormatter(aggregate?.twitter_follower?.twitter_followers ?? 0)
    } else if (i.text === 'Treasury') {
      i.title = nFormatter(aggregate?.treasury?.total_amount ?? 0)
    } else if (i.text === 'Token Price') {
      i.title = nFormatter(aggregate?.coingecko?.coin_data?.tokenprice ?? 0)
    }
  })

  const chartData0 = aggregate?.coingecko?.coin_market?.total_volumes
    .slice(0, 7)
    .map((d) => ({ date: d[0], value: d[1] }))

  const eventsData = aggregate?.sesh?.map((d, i) => {
    const start = new Date(Date.parse(d.start_time))
    const end = new Date(Date.parse(d.end_time))
    return {
      id: i,
      name: d.event_name,
      start,
      end,
    }
  })

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
            <Image
              src={`/api/imageProxy?imageUrl=${dao?.logo ?? daosquare}`}
              width="140px"
              height={'140px'}
              alt="image"
              className=" rounded-full"
            />
          </Box>
          <Box w="80%">
            <Box
              fontSize={{ base: '30px', md: '38px', lg: '48px' }}
              textAlign={{ base: 'center', md: 'left' }}
            >
              {dao?.name}
            </Box>
            <Text>{dao?.profile}</Text>
            <Flex justifyContent={{ base: 'center', md: 'left' }} mt={8}>
              <a
                href={
                  dao?.offical_links.find((i) => i.type === 'discord')
                    ?.link_text
                }
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
                href={
                  dao?.offical_links.find((i) => i.type === 'twitter')
                    ?.link_text
                }
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
                href={
                  dao?.offical_links.find((i) => i.type === 'dework')?.link_text
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="mx-4">
                  <Image
                    src={dework1}
                    alt="dework"
                    width={'16px'}
                    height={'16px'}
                  />
                </div>
              </a>
              <a
                href={
                  dao?.offical_links.find((i) => i.type === 'website')
                    ?.link_text
                }
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
        {data.map((item, i) => {
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
              ${nFormatter(aggregate?.coingecko?.coin_data?.market ?? 0)}
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
                {dkp?.dkp1.toLocaleString()}
              </Box>
              <Box fontSize="12px" color="#9d9caf">
                DKP2
              </Box>
              <Box fontSize="24px" fontWeight={900} color="#4C4B63" mb={5}>
                {dkp?.dkp2.toLocaleString()}
              </Box>
              <Box fontSize="12px" color="#9d9caf">
                DKP3
              </Box>
              <Box fontSize="24px" fontWeight={900} color="#4C4B63">
                {dkp?.dkp3.toLocaleString()}
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
              data={d.data.map((item) => ({
                title:
                  i === 1
                    ? aggregate?.governance?.[item.key as keyof GovernanceData]
                    : aggregate?.dework?.[item.key as keyof DeworkStatsData],
                text: item.text,
              }))}
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
                screenName: dao?.daoId,
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

      {!!guids && !!guids.length && (
        <>
          <h3 className="mb-2 mt-10 text-sm text-ds-600">Grants</h3>
          <div className="flex flex-wrap justify-between gap-y-6 ">
            {guids.map((d) => (
              <IconCardLink
                key={d._id}
                imageProxy={true}
                icon={d.logo ?? ''}
                text={d.category}
                title={d.name}
                link={`/daos/${d.daoId}`}
              />
            ))}
          </div>
        </>
      )}

      <Box h={{ base: 8, md: 16, lg: 32 }} />
    </Box>
  )
}

Landscape.getLayout = (page) => <DaoLayout>{page}</DaoLayout>
Landscape.getInitialProps = (ctx) => {
  return { key: String(ctx.query.id), daoId: String(ctx.query.id) }
}

export default Landscape
