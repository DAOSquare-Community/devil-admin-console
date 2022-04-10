import dynamic from 'next/dynamic'
import { ReactJsonViewProps } from 'react-json-view'

const DynamicReactJson = dynamic(import('react-json-view'), { ssr: false })

const DarkKey = ['forest']

const JsonView = (porps: ReactJsonViewProps) => {
  const item = window.localStorage.getItem('theme')
  return (
    <DynamicReactJson
      style={{ backgroundColor: 'transparent' }}
      theme={item && DarkKey.includes(item) ? 'colors' : undefined}
      {...porps}
    />
  )
}

export default JsonView
