import Image from 'next/image'
import Link from 'next/link'
import { FC, HTMLAttributes } from 'react'

export type PeopleCardPorps = HTMLAttributes<unknown> & {
  avatarUrl?: string
  name: string
  title?: string
}

const PeopleCard: FC<PeopleCardPorps> = ({
  avatarUrl,
  title,
  name,
  className,
  // ...other
}) => {
  return (
    <div
      className={` flex h-[168px] w-full  flex-col items-center rounded-xl bg-white/20 ${
        className ? className : ''
      }`}
    >
      <Image
        src={
          avatarUrl ??
          'https://s3-alpha-sig.figma.com/img/58e8/dc4c/59c2f060e1605720f69166fd01cb2479?Expires=1651449600&Signature=DjT-pPlWyz2zIV8HogPLHnkG0RwIXEJYmHFHTuNxaG5D~nRANwn3bp9HBWXi~OKN99nYmgD6rsgpOxqsn-UkPJDgQZdutMRsrcyepgs9n5RjzQ20ouX-5qfQTHXCh7J7OLs1015RIKcg15ra4oG602hGejW43pGmUZZ-SGwqsAJUHhC3KRrEUzlUYZ9NbmEPJCYDgJJdp1ofUypB2J76oF~bs1LCnyfUw-a2eOjldDPz6fONfW5pmxXd7I-we3eFk227LYaYEhz9g1TNrWwyMFq6zbP2pcor4nqcxxScYbxTsxWU1Hmqp4aT2cJE4986SpxEWp~YLARba-oNcMLkXQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA'
        }
        width={'96px'}
        height={'96px'}
        className={' avatar rounded-full'}
        alt="image"
      />
      <div className="mt-3 text-center text-sm font-bold text-ds-900">
        {name}
      </div>
      <div className="mt-1 text-center text-sm  text-ds-400">{title}</div>
    </div>
  )
}

export const DaoPeopleLink: FC<PeopleCardPorps & { link?: string }> = ({
  link,
  ...props
}) => {
  return (
    <div
      className=" w-[49%]  md:w-[31.5%]  lg:w-[15.05%]"
      // w={{ base: '100%', md: '49%', lg: '23.5%' }}
    >
      {link ? (
        <Link href={link}>
          <a rel="noopener noreferrer">
            <PeopleCard {...props} className="click-card" />
          </a>
        </Link>
      ) : (
        <PeopleCard {...props} />
      )}
    </div>
  )
}

export default PeopleCard
