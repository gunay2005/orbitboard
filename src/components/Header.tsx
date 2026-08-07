import { Search, Bell, Plus } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

interface Props {
  onOpenCommand: () => void
  onOpenCreate: () => void
}

const titles: Record<string, string> = {
  '/': 'Dashboard',
  '/board': 'Board',
  '/analytics': 'Analytics',
  '/team': 'Team',
  '/ai': 'AI Assistant',
  '/settings': 'Settings',
}

export default function Header({ onOpenCommand, onOpenCreate }: Props) {
  const location = useLocation()
  const title = titles[location.pathname] || 'Orbit'

  return (
    <header className="h-16 border-b border-black/5 dark:border-white/5 flex items-center justify-between px-4 md:px-6 bg-white/50 dark:bg-slate-900/30 backdrop-blur">
      <h2 className="text-lg font-semibold dark:text-white text-slate-900">{title}</h2>

      <div className="flex items-center gap-2 md:gap-3">
        <button
          onClick={onOpenCommand}
          className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition w-64 lg:w-80"
        >
          <Search size={16} />
          <span>Search or jump to...</span>
          <kbd className="ml-auto px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/5 text-xs border border-black/10 dark:border-white/10">⌘K</kbd>
        </button>

        <button className="p-2 rounded-lg glass glass-hover relative">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
        </button>
        <ThemeToggle />
        {location.pathname === '/board' && (
          <button
            onClick={onOpenCreate}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-medium text-sm transition"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">New Task</span>
          </button>
        )}
      </div>
    </header>
  )
}