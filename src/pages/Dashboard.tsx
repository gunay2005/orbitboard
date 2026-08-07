import { motion } from 'framer-motion'
import { CheckCircle2, Clock, TrendingUp, AlertCircle } from 'lucide-react'
import { useBoardStore } from '../store/useBoardStore'

export default function Dashboard() {
  const { columns } = useBoardStore()

  const total = columns.reduce((a, c) => a + c.tasks.length, 0)
  const done = columns.find((c) => c.id === 'done')?.tasks.length || 0
  const progress = columns.find((c) => c.id === 'inprogress')?.tasks.length || 0
  const high = columns.reduce((a, c) => a + c.tasks.filter((t) => t.priority === 'high').length, 0)

  const stats = [
    { label: 'Total Tasks', value: total, icon: CheckCircle2, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { label: 'In Progress', value: progress, icon: Clock, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { label: 'Completed', value: done, icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'High Priority', value: high, icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-500/10' },
  ]

  const recent = columns.flatMap((col) => col.tasks.map((t) => ({ ...t, col: col.title }))).slice(0, 5)

  return (
    <div className="h-full overflow-y-auto p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-5"
            >
              <div className={`w-10 h-10 rounded-xl ${s.bg} border border-white/5 flex items-center justify-center ${s.color} mb-3`}>
                <s.icon size={20} />
              </div>
              <h3 className="text-2xl font-bold dark:text-white text-slate-900">{s.value}</h3>
              <p className="text-sm text-slate-500">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="lg:col-span-2 glass rounded-2xl p-6">
            <h3 className="font-semibold text-lg mb-4 dark:text-white text-slate-900">Recent Tasks</h3>
            <div className="space-y-3">
              {recent.map((t) => (
                <div key={t.id} className="flex items-center justify-between p-3 rounded-xl bg-black/5 dark:bg-white/5">
                  <div>
                    <p className="text-sm font-medium dark:text-slate-200 text-slate-800">{t.title}</p>
                    <p className="text-xs text-slate-500">{t.col} • {t.priority}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-md text-xs font-medium border ${
                    t.priority === 'high' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                    t.priority === 'medium' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                    'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  }`}>{t.priority}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass rounded-2xl p-6">
            <h3 className="font-semibold text-lg mb-4 dark:text-white text-slate-900">Activity</h3>
            <div className="space-y-4">
              {[
                { text: 'Project setup completed', time: '2h ago' },
                { text: 'New task added to Review', time: '4h ago' },
                { text: 'Sprint planning scheduled', time: '1d ago' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                  <div>
                    <p className="text-sm dark:text-slate-300 text-slate-700">{item.text}</p>
                    <p className="text-xs text-slate-500">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}