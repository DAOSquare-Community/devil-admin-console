import { useEffect, FC } from 'react'
import { Box, Flex, useMediaQuery } from '@chakra-ui/react'
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Label,
} from 'recharts'
import Image from 'next/image'
import BaseCard from 'components/card/baseCard'
import { IconCardLink } from 'components/card/iconCard'
import TaskCard from 'components/card/taskCard'
import TitleCard from 'components/card/titleCard'

import dework from 'public/assets/images/dework2.svg'
import dao from 'public/assets/images/dao.svg'
import DaoLayout from 'components/dao-square-nav/layout'
import { NextPageWithLayout } from 'types/page'
import dayjs from 'dayjs'
import { Timeline } from 'react-twitter-widgets'
import { DaoPeopleLink } from 'components/card/peopleCard'
import { useAxiosQuery } from 'lib/request/use-fetch'
import { DaoStats, Dework, Governanace } from 'models/DaoStats'
import { DaoStatsData } from 'types/daoStats'
import { Member } from 'models/Member'
import { Dao } from 'models/Dao'
import { Activity } from 'models/activity'
// import Link from 'next/link'

const taskData = [
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
]

const Events: FC = () => {
  const { data: aData = [] } = useAxiosQuery<
    { data: { items: Activity[] } },
    Activity[]
  >(
    '/v2/activity/list',
    { pageSize: 2 },
    {
      select: (sData) => {
        return sData.data.items
      },
    }
  )

  return (
    <div className="mt-10 mb-16 flex flex-1 flex-wrap justify-between">
      {aData.map(({ title, img, start_at, location }) => {
        return (
          <a
            href="https://www.figma.com/file/JFKsusO1q62WzRFTY0Phms/DAOscape?node-id=2%3A2015"
            key={title}
            target="_blank"
            className="relative mb-4 h-[291px]  w-full rounded-xl lg:mb-0 lg:w-[49%] "
            rel="noreferrer"
          >
            <Image
              src={img}
              alt="image"
              layout="fill"
              objectFit="cover"
              className=" rounded-xl"
            />

            <div className="absolute bottom-0 flex  w-full justify-between rounded-b-xl bg-ds-content/70  p-3 backdrop-blur-lg">
              <p className="text-base font-bold text-ds-900">{title}</p>
              <p>
                {`${dayjs(start_at).format('MM.DD.YYYY')}  `}
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

  const { data } = useAxiosQuery<{ data: DaoStats }>('/v2/daostats')
  const { data: mData } = useAxiosQuery<{ data: { items: Member[] } }>(
    '/v2/member/list',
    {
      pageSize: 6,
      filters: { is_hot: true },
    }
  )

  const { data: dData } = useAxiosQuery<{ data: { items: Dao[] } }>(
    '/v2/dao/list',
    {
      pageSize: 4,
      filters: { is_hot: true },
    }
  )

  const { data: gData } = useAxiosQuery<{ data: { items: Dao[] } }>(
    '/v2/dao/list',
    {
      pageSize: 8,
      filters: { category: 'guilds' },
    }
  )

  const guids = gData?.data.items ?? []

  const { data: pData } = useAxiosQuery<{ data: { items: Dao[] } }>(
    '/v2/dao/list',
    {
      pageSize: 8,
      filters: { category: 'portfolio' },
    }
  )
  const portfolio = pData?.data.items ?? []

  const hotMembers = mData?.data?.items ?? []
  const hotDaos = dData?.data?.items ?? []

  const daoStats = data?.data

  const { data: list } = useAxiosQuery<{ data: DaoStatsData }>(
    '/v2/daostats/record'
  )

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
          <TitleCard title="Daos">
            <Box
              px={4}
              fontSize="24px"
              fontWeight={900}
              height="36px"
              lineHeight="36px"
              overflow="hidden"
            >
              {/* {100000000 * price} */}
              {daoStats?.daos ?? 0}
            </Box>
            <Box w="100%" h="220px">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  width={500}
                  height={400}
                  data={list?.data?.daosRecords ?? []}
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
          <TitleCard title="Members">
            <Box
              px={4}
              fontSize="24px"
              fontWeight={900}
              height="36px"
              lineHeight="36px"
              overflow="hidden"
            >
              {daoStats?.members ?? 0}
            </Box>
            <Box w="100%" h="220px">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  width={500}
                  height={400}
                  data={list?.data?.membersRecords ?? []}
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
          <TitleCard title="Treasury">
            <Box
              px={4}
              fontSize="24px"
              fontWeight={900}
              height="36px"
              lineHeight="36px"
              overflow="hidden"
            >
              {daoStats?.treasury?.toFixed(2) ?? 0}
            </Box>
            <Box w="100%" h="220px">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  width={500}
                  height={400}
                  data={list?.data?.treasuryRecords ?? []}
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
          <TitleCard title="Category">
            <Box w="100%" h="256px">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={60}>
                  <Pie
                    data={daoStats?.dao_category.map((i) => ({
                      name: i.dao_category,
                      value: i.count,
                    }))}
                    dataKey="value"
                    cx="50%"
                    cy="40%"
                    innerRadius={60}
                    outerRadius={80}
                  >
                    <Label fontSize="24" fontWeight={900} position={'center'}>
                      {
                        daoStats?.dao_category.reduce(
                          (i, r) => ({ ...i, count: i.count + r.count }),
                          { count: 0 }
                        ).count
                      }
                    </Label>
                    {daoStats?.dao_category.map((entry, index) => (
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
      </Flex>

      <Flex wrap="wrap" justifyContent="space-between" mb={16}>
        {taskData.map((d, i) => (
          <Box key={i} w={{ base: '100%', lg: '49%' }} mb={{ base: 4, lg: 0 }}>
            <TaskCard
              {...d}
              className="click-card"
              data={d.data.map((item) => ({
                title:
                  i === 0
                    ? daoStats?.governanace?.[item.key as keyof Governanace]
                    : daoStats?.dework?.[item.key as keyof Dework],
                text: item.text,
              }))}
            />
          </Box>
        ))}
      </Flex>

      <h3 className="mb-2 mt-10 text-sm text-ds-600">Hots</h3>
      <div className="mb-6 flex flex-wrap justify-between gap-y-6">
        {hotMembers
          // .map((i) => ({ ...i, title: i.daos[0] }))
          .map((d) => (
            // eslint-disable-next-line react/jsx-no-undef
            <DaoPeopleLink
              key={d.name}
              {...d}
              name={d.name ?? ''}
              title={d.daos[0] ?? ''}
            />
          ))}
      </div>
      <div className="flex flex-wrap justify-between gap-y-6 ">
        {hotDaos.map((d) => (
          <IconCardLink
            key={d._id}
            icon={d.logo ?? ''}
            imageProxy
            text={d.category}
            title={d.name}
            link={`/daos/${d.daoId}`}
          />
        ))}
      </div>

      {!!guids && !!guids.length && (
        <>
          <h3 className="mb-2 mt-10 text-sm text-ds-600">Guilds</h3>
          <div className="flex flex-wrap justify-between gap-y-6 ">
            {guids.map((d) => (
              <IconCardLink
                key={d._id}
                icon={d.logo ?? ''}
                imageProxy
                text={d.category}
                title={d.name}
                link={`/daos/${d.daoId}`}
              />
            ))}
          </div>
        </>
      )}

      {!!portfolio && !!portfolio.length && (
        <>
          <h3 className="mb-2 mt-10 text-sm text-ds-600">Portfolio</h3>
          <div className="flex flex-wrap justify-between gap-y-6 ">
            {portfolio.map((d) => (
              <IconCardLink
                key={d._id}
                icon={d.logo ?? ''}
                imageProxy
                text={d.category}
                title={d.name}
                link={`/daos/${d.daoId}`}
              />
            ))}
          </div>
        </>
      )}

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

Home.getLayout = (page) => <DaoLayout>{page}</DaoLayout>

export default Home
