// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import { FC, ReactElement, ReactNode, useState } from 'react'

interface TabContainerProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  tab: string
  setTab: (tab: string) => void
  onAdd?: () => void
}

interface TabItemProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  title?: string
  tab: string
  diabledClose?: boolean
  onClose?: (lastTab: string, index: number) => void
}

export const TabItem: FC<TabItemProps> = (props) => {
  return <div {...props} />
}

const mapChildren = <T extends ReactNode>(
  children: T
): ReactElement<TabItemProps>[] => {
  const ch = (
    Array.isArray(children) ? children : [children]
  ) as ReactElement<TabItemProps>[]
  const filterCh: typeof ch = []
  ch.forEach((c) => {
    if (!!c.props) {
      filterCh.push(c)
    }
    if (Array.isArray(c)) {
      filterCh.push(...mapChildren(c))
    }
  })
  return filterCh
}

const TabContainer: FC<TabContainerProps> = ({
  children,
  tab: tabKey,
  setTab,
  onAdd,
  ...props
}) => {
  const filterCh = mapChildren(children)

  return (
    <>
      <div className="tabs tabs-boxed">
        {filterCh?.map(
          ({ props: { tab, title, onClose, diabledClose } }, index) => (
            <a
              key={tab}
              className={classNames('tab flex gap-2', {
                'tab-active': tab === tabKey,
              })}
              onClick={() => setTab?.(tab)}
            >
              {title ?? tab}
              {!diabledClose && (
                <button
                  className="btn btn-ghost btn-xs btn-circle m-0"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    if (tab !== tabKey) {
                      onClose && onClose(tabKey, index)
                    } else {
                      const nextIndex =
                        index === filterCh.length - 1 ? index - 1 : index + 1
                      onClose && onClose(filterCh[nextIndex]?.props.tab, index)
                    }
                  }}
                >
                  {/* <FontAwesomeIcon
                    icon={['fas', 'xmark']}
                    className={'h-3 w-3'}
                  /> */}
                </button>
              )}
            </a>
          )
        )}
        {!!onAdd && (
          <button
            className="btn btn-ghost btn-sm btn-circle   ml-2"
            onClick={onAdd}
          >
            {/* <FontAwesomeIcon icon={['fas', 'plus']} className={'h-4 w-4'} /> */}
          </button>
        )}
      </div>
      {filterCh?.map((item) => (
        <div
          {...props}
          key={item.props.tab}
          className={`${tabKey === item.props.tab ? 'block' : 'hidden'}`}
          role="tabpanel"
          id={item.props.tab}
          aria-labelledby="tabs-home-tab"
        >
          {item}
        </div>
      ))}
    </>
  )
}

export const TabAutoContainer: FC<
  Omit<TabContainerProps, 'tab' | 'setTab'> & { initTab?: string }
> = ({ initTab, children, ...other }) => {
  const ch = (
    Array.isArray(children) ? children : [children]
  ) as ReactElement<TabItemProps>[]
  const [tab, setTab] = useState(initTab ?? ch?.[0]?.props?.tab ?? '')
  return <TabContainer {...other} {...{ tab, setTab, children }} />
}

export default TabContainer
