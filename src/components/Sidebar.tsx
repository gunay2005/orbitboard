import { NavLink, useLocation } from 'react-router-dom'
import { LayoutDashboard, KanbanSquare, BarChart3, Settings, Sparkles, Users, X } from 'lucide-react'

interface SidebarProps {
  onClose?: () => void
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: KanbanSquare, label: 'Board', path: '/board' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: Users, label: 'Team', path: '/team' },
  { icon: Sparkles, label: 'AI Assistant', path: '/ai' },
  { icon: Settings, label: 'Settings', path: '/settings' },
]

export default function Sidebar({ onClose }: SidebarProps) {
  const location = useLocation()

  return (
    <aside className="w-64 h-screen border-r border-black/5 dark:border-white/5 bg-white/95 dark:bg-slate-900/95 lg:dark:bg-slate-900/50 backdrop-blur flex flex-col">
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
            O
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight dark:text-white text-slate-900">Orbit</h1>
            <p className="text-xs text-slate-500">AI Workspace</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="lg:hidden p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded">
            <X size={18} className="text-slate-500" />
          </button>
        )}
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <NavLink
              key={item.label}
              to={item.path}
              onClick={() => onClose?.()}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          )
        })}
      </nav>

      <div className="p-4 border-t border-black/5 dark:border-white/5">
        <div className="glass rounded-xl p-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-600 flex items-center justify-center text-xs font-bold text-white">
              GS
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate dark:text-white text-slate-900">Gunay Sadıxova</p>
              <p className="text-xs text-slate-500 truncate">Frontend Lead</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}