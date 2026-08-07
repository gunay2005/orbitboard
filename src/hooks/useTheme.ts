import { create } from 'zustand'
import { useEffect } from 'react'

interface ThemeStore {
  isDark: boolean
  toggle: () => void
}

export const useTheme = create<ThemeStore>((set) => ({
  isDark: true,
  toggle: () => set((state) => ({ isDark: !state.isDark })),
}))

export function useThemeEffect() {
  const { isDark } = useTheme()
  useEffect(() => {
    const html = document.documentElement
    if (isDark) {
      html.classList.add('dark')
    } else {
      html.classList.remove('dark')
    }
  }, [isDark])
}