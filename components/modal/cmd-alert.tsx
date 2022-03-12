import { useCallback } from 'react'
import { AlertModal } from './alert'
import { CMD, CmdManage } from './cmd'

const CmdAlertKey = 'cmd_alert_key'

type ContinueAction = () => void

export const Alert = {
  show: (message: string, onClick: ContinueAction) => {
    CmdManage.emit(CmdAlertKey, { isOpen: true, onClick, message })
  },
}

const AlertComponent = () => {
  const onClose = useCallback(() => {
    CmdManage.emit(CmdAlertKey)
  }, [])

  const render = useCallback(
    (data) => {
      return (
        <AlertModal
          onClose={onClose}
          {...data}
          onClick={() => {
            data?.onClick?.()
            CmdManage.emit(CmdAlertKey)
          }}
        />
      )
    },
    [onClose]
  )

  return <CMD event={CmdAlertKey} render={render} />
}

export default AlertComponent
