import SlideMenu from './slide-menu'
import Footer from './footer'
import { FC } from 'react'
import Header from './header'
import HeaderBar, { HeaderBarProps } from './header-bar'

type LayoutProps = {
  headerTitle?: string
}
const Layout: FC<LayoutProps & HeaderBarProps> = ({
  children,
  title,
  showHeaderBar,
}) => {
  return (
    <>
      <Header />
      <div className=" flex flex-1 flex-row">
        <SlideMenu />
        <div className=" flex flex-1 flex-col">
          <HeaderBar title={title} showHeaderBar={showHeaderBar} />
          <main className="h-full px-3 py-3">{children}</main>
          <Footer />
        </div>
      </div>
    </>
  )
}

export const NoSlideMenuLayout: FC<LayoutProps> = ({
  children,
  headerTitle,
}) => {
  return (
    <>
      <Header title={headerTitle} />
      <div className="flex h-full  flex-col">
        <main className="h-full">{children}</main>
        <Footer />
      </div>
    </>
  )
}

export default Layout
