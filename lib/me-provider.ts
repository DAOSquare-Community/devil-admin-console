import React from 'react'
import { MeInterface } from 'types/user'

type Action = { type: 'update'; payload: Partial<MeInterface> }

export function meReducer(state: MeInterface, action: Action): MeInterface {
  switch (action.type) {
    case 'update':
      return { ...state, ...action.payload }
  }
}

type ContextType = {
  state: MeInterface
  dispatch: React.Dispatch<Action>
}

const MeContext = React.createContext<ContextType>({} as ContextType)

export default MeContext
