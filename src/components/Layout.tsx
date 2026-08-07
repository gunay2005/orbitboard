import { useState, useEffect } from 'react'
import { Sparkles, Menu } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import CommandPalette from './CommandPalette'
import AIChatPanel from './AIChatPanel'
import CreateTaskModal from './CreateTaskModal'
import { useThemeEffect } from '../hooks/useTheme'

export default function Layout({ children }: { children: React.ReactNode }) {
  const [commandOpen, setCommandOpen] = useState(false)
  const [aiOpen, setAiOpen] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  useThemeEffect()

  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCommandOpen((prev) => !prev)
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'a') {
        e.preventDefault()
        setAiOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className={`fixed lg:static inset-y-0 left-0 z-50 transform transition-transform duration-300 lg:transform-none ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <div className="h-16 border-b border-black/5 dark:border-white/5 flex items-center justify-between px-4 bg-white/50 dark:bg-slate-900/30 backdrop-blur lg:hidden">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg glass">
            <Menu size={20} />
          </button>
          <h1 className="font-bold text-lg dark:text-white text-slate-900">Orbit</h1>
          <div className="w-10" />
        </div>

        <Header onOpenCommand={() => setCommandOpen(true)} onOpenCreate={() => setCreateOpen(true)} />
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>

      <CommandPalette isOpen={commandOpen} onClose={() => setCommandOpen(false)} />
      <AIChatPanel isOpen={aiOpen} onClose={() => setAiOpen(false)} />
      <CreateTaskModal isOpen={createOpen} onClose={() => setCreateOpen(false)} />

      <button
        onClick={() => setAiOpen(!aiOpen)}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 shadow-lg shadow-violet-500/30 flex items-center justify-center text-white hover:scale-110 transition-transform z-30"
      >
        <Sparkles size={20} />
      </button>
    </div>
  )
}