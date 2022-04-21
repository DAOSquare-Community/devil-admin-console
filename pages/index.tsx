import { useState, useEffect, FC } from 'react'
import { Box, Flex, useMediaQuery } from '@chakra-ui/react'
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
import BaseCard from 'components/card/baseCard'
import IconCard, { IconCardLink } from 'components/card/iconCard'
import TaskCard from 'components/card/taskCard'
import TitleCard from 'components/card/titleCard'

import incubator from 'public/assets/images/incubator.svg'
import dkp from 'public/assets/images/dkp.svg'
import daoscape from 'public/assets/images/daoscape.svg'
import nft4ever from 'public/assets/images/nft4ever.svg'

import dao2 from 'public/assets/images/dao2.svg'
import devil from 'public/assets/images/devil.svg'
import cafeteria from 'public/assets/images/cafeteria.svg'
import matrix from 'public/assets/images/matrix.svg'
import whaledao from 'public/assets/images/whaledao.svg'

import daohaus from 'public/assets/images/daohaus.svg'
import ceramic from 'public/assets/images/ceramic.svg'
import brightid from 'public/assets/images/brightid.svg'
import unlock from 'public/assets/images/unlock.svg'
import multis from 'public/assets/images/multis.svg'
import doingud from 'public/assets/images/doingud.svg'
import dework from 'public/assets/images/dework2.svg'
import dao from 'public/assets/images/dao.svg'
import DaoLayout from 'components/dao-square-nav/layout'
import { NextPageWithLayout } from 'types/page'
import dayjs from 'dayjs'
import { Timeline } from 'react-twitter-widgets'
import Calendar from 'components/calendar'
import { DaoPeopleLink } from 'components/card/peopleCard'
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
    link: '/daos/123',
  },
  {
    icon: nft4ever,
    title: 'NFT4ever',
    text: 'Equity Marketplace',
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

const newsData = [
  {
    image:
      'https://s3-alpha-sig.figma.com/img/0d2e/a304/3bdd227d9fb3bbdf6c7984be8b2a1138?Expires=1650844800&Signature=bMooaTmO66gPZzi26hznVwMH9XIT5~idxtaXs~7X6ngc67KPPMm5rPmsa2SQWp20lKFWrJENdQBDO5PXJzVVx1fCQ6o3bckmME6ugJC6A233lSub0UXECGR4vsj-GYmGlcDChdNoCfpJ-QUrWk~UqUakfH8wDqYa61Jk0jjYBq9bNWyfgUj98-ZexWja1jtNfbjW-Dng-ZrJkfGJYJyxIqHrAK89Pjam-qHElFZ3PF~WWNnhCUEP8oKdXoIp3-ySToFtptf-Y6KgP6b3LDIUPOw1WelkLOEWLI0Xnf2kjBL4-2BDwgGoq7Q40W0EtILx6LgeiMdT~q~e~lthUtSmag__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    title: 'ETHDenver 2022',
    date: new Date(),
    location: 'Denver',
    link: 'https://www.figma.com/file/JFKsusO1q62WzRFTY0Phms/DAOscape?node-id=2%3A2015',
  },
  {
    image:
      'https://s3-alpha-sig.figma.com/img/6563/8185/835cd5163b1d5a806f9a0ab4ff5dd6df?Expires=1650844800&Signature=XJ9x2qU-ovpN-2xcLiwCcxGpwVpnMIJA4j1YSnkSfcqqH19IfMvBCYXJqBQZ8VC98Nuh362rkNR8kp2dc81vqUO~FT0Temlypx4VvDEud7iGgA1fDSx3LbfyfQd5XVZObfYyCHzh~y1H2MdfmrP8g-T8fmKZ8tYVWBax-j8SjXzzPdWlFynFa6AahbhxQ2A48mB9yleCOrtnuvn1ZeWpT5Lf~yRIC5EI~foEAOK1NTFMeddCeDQaYECS6b~4M2NFW1-8j6-NifyQi366nLWzf5BE91qrGCmFknc3XDYIQmrpXDssIGnI9CdePY6HMHLDV955TYiNUpjFjDzLpAFx4Q__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    title: 'MCON 2022',
    date: new Date(),
    location: 'Denver',
    link: 'https://www.figma.com/file/JFKsusO1q62WzRFTY0Phms/DAOscape?node-id=2%3A2015',
  },
]

const peopleData = [
  { name: 'Jerome Bell', title: 'MetaCartel' },
  { name: 'Jerome Bell2', title: 'MetaCartel' },
  { name: 'Jerome Bell3', title: 'MetaCartel' },
  { name: 'Jerome Bell4', title: 'MetaCartel' },
  { name: 'Jerome Bell5', title: 'MetaCartel' },
  { name: 'Jerome Bell6', title: 'MetaCartel' },
]

const Events: FC = () => {
  return (
    <div className="mt-10 mb-16 flex flex-1 flex-wrap justify-between">
      {newsData.map(({ title, image, date, location }) => {
        return (
          <a
            href="https://www.figma.com/file/JFKsusO1q62WzRFTY0Phms/DAOscape?node-id=2%3A2015"
            key={title}
            target="_blank"
            className="relative mb-4 h-[291px]  w-full rounded-xl lg:mb-0 lg:w-[49%] "
            rel="noreferrer"
          >
            <Image
              src={image}
              alt="image"
              layout="fill"
              objectFit="cover"
              className=" rounded-xl"
            />

            <div className="absolute bottom-0 flex  w-full justify-between rounded-b-xl bg-ds-content/70  p-3 backdrop-blur-lg">
              <p className="text-base font-bold text-ds-900">{title}</p>
              <p>
                {`${dayjs(date).format('MM.DD.YYYY')}  `}
                {location}
              </p>
            </div>
          </a>
        )
      })}
    </div>
  )
}

const Home: NextPageWithLayout = () => {
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
      <div className="flex flex-col py-12">
        <div className=" text-2xl leading-[48px] text-[#121127]">
          Landscape of DAO ecosystem
        </div>
        <div className=" text-base">
          Owned and managed by DAOSquare community
        </div>
      </div>
      <Events />

      <h3 className="mb-2 mt-10 text-sm text-ds-600">Panorama</h3>
      <Flex wrap="wrap" justifyContent="space-between" mb={8}>
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

      <h3 className="mb-2 mt-10 text-sm text-ds-600">Hots</h3>
      <div className="mb-6 flex flex-wrap justify-between gap-y-6">
        {peopleData.map((d) => (
          // eslint-disable-next-line react/jsx-no-undef
          <DaoPeopleLink key={d.name} {...d} />
        ))}
      </div>
      <div className="flex flex-wrap justify-between gap-y-6 ">
        {productsData.map((d) => (
          <IconCardLink key={d.title} {...d} />
        ))}
      </div>

      <h3 className="mb-2 mt-10 text-sm text-ds-600">Guilds</h3>
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

      <h3 className="mb-2 mt-10 text-sm text-ds-600">Portfolio</h3>
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

      <h3 className="mb-2 mt-10 text-sm text-ds-600">News</h3>
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

      <Box h={{ base: 8, md: 16, lg: 32 }} />
    </Box>
  )
}

Home.getLayout = (page) => <DaoLayout>{page}</DaoLayout>

export default Home
