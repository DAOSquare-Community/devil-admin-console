import classNames from 'classnames'
import { FC, ReactElement, useState } from 'react'

interface TabContainerProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  tab: number
  setTab: (tab: number) => void
}

interface TabItemProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  title: string
}

export const TabItem: FC<TabItemProps> = (props) => {
  return <div {...props} />
}

const TabContainer: FC<TabContainerProps> = ({
  children,
  tab,
  setTab,
  ...props
}) => {
  const ch = (
    Array.isArray(children) ? children : [children]
  ) as ReactElement<TabItemProps>[]

  const filterCh = ch.filter((c) => !!c.props)
  return (
    <>
      <div className="tabs tabs-boxed">
        {filterCh?.map(({ props: { title } }, index) => (
          <div className="indicator" key={title}>
            {/* <span className="badge indicator-item  hover:block">
              <FontAwesomeIcon icon={['fas', 'xmark']} className={'h-4 w-4'} />
            </span> */}
            <a
              className={classNames('tab', { 'tab-active': tab === index })}
              onClick={() => setTab?.(index)}
            >
              {title}
            </a>
          </div>
        ))}
      </div>
      {filterCh?.map((item, index) => (
        <div
          {...props}
          key={item.props.title}
          className={`${tab === index ? 'block' : 'hidden'}`}
          role="tabpanel"
          id={item.props.title}
          aria-labelledby="tabs-home-tab"
        >
          {item}
        </div>
      ))}
    </>
  )
}

export const TabAutoContainer: FC<
  Omit<TabContainerProps, 'tab' | 'setTab'> & { initTab?: number }
> = ({ initTab = 0, ...other }) => {
  const [tab, setTab] = useState(initTab)
  return <TabContainer {...other} {...{ tab, setTab }} />
}

export default TabContainer
