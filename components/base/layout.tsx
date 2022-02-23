import SlideMenu from './slide-menu'
import Footer from './footer'
import { FC } from 'react'
import Header from './header'
import HeaderBar, { HeaderBarProps } from './header-bar'
import NavBar from './navbar'

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
      <div className="drawer-mobile drawer h-screen w-full bg-gray-100">
        <input id="drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <NavBar />
          <HeaderBar title={title} showHeaderBar={showHeaderBar} />
          <main className="px-5">{children}</main>
        </div>
        <div className="drawer-side">
          <label htmlFor="drawer" className="drawer-overlay" />
          <SlideMenu />
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
      <div className=" flex h-screen flex-1 flex-col">
        <main className="flex flex-1">{children}</main>
        <Footer />
      </div>
    </>
  )
}

export default Layout
