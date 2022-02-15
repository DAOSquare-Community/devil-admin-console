import Head from 'next/head'
import { useRouter } from 'next/router'
import { FC } from 'react'
const AdminConsoleTitle = 'Dev Console Admin'

const Header: FC<{ title?: string }> = ({ title, children }) => {
  const router = useRouter()
  const currentPath = router.pathname.split('/')[1]
  return (
    <Head>
      <title>{title ?? currentPath ?? AdminConsoleTitle}</title>
      <meta name="description" content="Generated by DaoSquare" />
      <link rel="icon" href="/favicon.ico" />
      {children}
    </Head>
  )
}

export default Header
