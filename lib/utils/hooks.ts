import { useEffect, useLayoutEffect } from 'react'

export const useCustomLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect
