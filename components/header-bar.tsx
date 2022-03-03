import { useRouter } from 'next/router'
import { FC } from 'react'

export type HeaderBarProps = { title?: string; showHeaderBar?: boolean }

const HeaderBar: FC<HeaderBarProps> = ({
  title,
  children,
  showHeaderBar = true,
}) => {
  const router = useRouter()
  const currentPath = router.pathname.split('/')[1]
  if (!showHeaderBar) return null
  return (
    <header className=" py-5 px-5">
      <span className=" text-xl font-bold capitalize">
        {title ?? currentPath}
      </span>
      {children}
    </header>
  )
}

export default HeaderBar
