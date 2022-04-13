import { useIsDarkTheme } from 'lib/config/theme'
import dynamic from 'next/dynamic'
import { ReactJsonViewProps } from 'react-json-view'

const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false })

const JsonView = (porps: ReactJsonViewProps) => {
  const isDark = useIsDarkTheme()
  return (
    <DynamicReactJson
      style={{ backgroundColor: 'transparent' }}
      theme={isDark ? 'colors' : undefined}
      {...porps}
    />
  )
}

export default JsonView
