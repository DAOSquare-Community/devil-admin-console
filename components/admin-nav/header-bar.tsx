import { useRouter } from 'next/router'
import { FC } from 'react'

export type HeaderBarProps = {
  title?: string
  discirb?: string
  showHeaderBar?: boolean
}

const HeaderBar: FC<HeaderBarProps> = ({
  title,
  discirb,
  showHeaderBar = true,
}) => {
  const router = useRouter()
  const currentPath = router.pathname.split('/')[1]
  if (!showHeaderBar) return null
  return (
    <>
      <h1 className=" mb-5 text-xl font-semibold capitalize ">
        {title ?? currentPath}
      </h1>
      {!!discirb && <p>{discirb}</p>}
    </>
  )
}

export default HeaderBar
