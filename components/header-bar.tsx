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
    <div className=" py-5 px-3">
      <span className=" text-xl font-bold capitalize">
        {title ?? currentPath}
      </span>
      {children}
    </div>
  )
}

export default HeaderBar
