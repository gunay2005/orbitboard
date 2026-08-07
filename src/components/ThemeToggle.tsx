import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

export default function ThemeToggle() {
  const { isDark, toggle } = useTheme()
  return (
    <button onClick={toggle} className="p-2 rounded-lg glass glass-hover" aria-label="Toggle theme">
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}