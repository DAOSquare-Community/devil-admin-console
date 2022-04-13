import { useEffect, useState } from 'react'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { themeChange } from 'theme-change'

export const useTheme = (themeKey = 'data-theme') => {
  const item = document.documentElement.getAttribute(themeKey)
  // const item = window.localStorage.getItem('theme')
  const [theme, setTheme] = useState(item)
  useEffect(() => {
    const els = document.querySelectorAll('[data-set-theme]')
    const cleckListener = () => {
      const item = document.documentElement.getAttribute(themeKey)
      setTheme(item)
    }
    els.forEach((el) => {
      el.addEventListener('click', cleckListener)
    })
    return () => {
      els.forEach((el) => {
        el.removeEventListener('click', cleckListener)
      })
    }
  }, [themeKey])
  return theme
}

export const useIsDarkTheme = () => {
  const theme = useTheme()
  return theme && DarkKey.includes(theme)
}

export const useThemeChange = () => {
  useEffect(() => {
    themeChange(false)
  }, [])
}

export const DarkKey = ['forest', 'dark', 'night', 'dracula']
