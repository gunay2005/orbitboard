import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X, Command } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const commands = [
  { id: '1', label: 'Go to Dashboard', path: '/' },
  { id: '2', label: 'Go to Board', path: '/board' },
  { id: '3', label: 'Go to Analytics', path: '/analytics' },
  { id: '4', label: 'Go to Team', path: '/team' },
  { id: '5', label: 'Go to AI Assistant', path: '/ai' },
  { id: '6', label: 'Go to Settings', path: '/settings' },
]

export default function CommandPalette({ isOpen, onClose }: Props) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const filtered = commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()))

  const handleSelect = (path: string) => {
    navigate(path)
    onClose()
    setQuery('')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-white dark:bg-slate-900 border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden mx-4"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-black/5 dark:border-white/5">
              <Search size={18} className="text-slate-400" />
              <input
                autoFocus
                type="text"
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent outline-none text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-500"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button onClick={onClose} className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded">
                <X size={16} className="text-slate-400" />
              </button>
            </div>
            <div className="max-h-64 overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <div className="px-4 py-8 text-center text-slate-500 text-sm">No commands found</div>
              ) : (
                filtered.map((cmd) => (
                  <button
                    key={cmd.id}
                    onClick={() => handleSelect(cmd.path)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-black/5 dark:hover:bg-white/5 transition text-left text-sm text-slate-700 dark:text-slate-300"
                  >
                    <Command size={14} className="text-slate-500" />
                    <span>{cmd.label}</span>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}