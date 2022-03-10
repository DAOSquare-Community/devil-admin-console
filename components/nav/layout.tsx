import SlideMenu from './slide-menu'
import Footer from './footer'
import { FC } from 'react'
import Header from './header'
import HeaderBar, { HeaderBarProps } from './header-bar'
import NavBar from './navbar'
import Breadcrumbs from './breadcrumbs'

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
      <div className="drawer-mobile drawer h-screen  bg-base-100">
        <input id="drawer" type="checkbox" className="drawer-toggle" />
        <div
          className="drawer-content "
          style={{ scrollBehavior: 'smooth', scrollPaddingTop: '5rem' }}
        >
          <NavBar />

          <div className="p-6 pb-16">
            <div className="flex flex-col-reverse justify-between gap-6 xl:flex-row">
              <div className="prose w-full  flex-grow">
                <Breadcrumbs useDefaultStyle />
                <HeaderBar title={title} showHeaderBar={showHeaderBar} />
                {children}
              </div>
            </div>
          </div>
        </div>
        <div
          className="drawer-side"
          style={{ scrollBehavior: 'smooth', scrollPaddingTop: '5rem' }}
        >
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
