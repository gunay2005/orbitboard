import { motion } from 'framer-motion'
import { useBoardStore } from '../store/useBoardStore'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export default function Analytics() {
  const { columns } = useBoardStore()

  const columnData = columns.map((col) => ({
    name: col.title,
    tasks: col.tasks.length,
  }))

  const priorityCount = { low: 0, medium: 0, high: 0 }
  columns.forEach((col) => {
    col.tasks.forEach((t) => {
      priorityCount[t.priority]++
    })
  })

  const pieData = [
    { name: 'Low', value: priorityCount.low },
    { name: 'Medium', value: priorityCount.medium },
    { name: 'High', value: priorityCount.high },
  ]

  const COLORS = ['#10b981', '#f59e0b', '#ef4444']

  const total = columns.reduce((a, c) => a + c.tasks.length, 0)
  const done = columns.find((c) => c.id === 'done')?.tasks.length || 0
  const completionRate = total > 0 ? Math.round((done / total) * 100) : 0

  return (
    <div className="h-full overflow-y-auto p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Total Tasks', value: total },
            { label: 'Completed', value: done },
            { label: 'Completion Rate', value: `${completionRate}%` },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-5 text-center"
            >
              <h3 className="text-3xl font-bold dark:text-white text-slate-900">{s.value}</h3>
              <p className="text-sm text-slate-500 mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="font-semibold text-lg mb-6 dark:text-white text-slate-900">Tasks by Column</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={columnData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: '#e2e8f0',
                    }}
                  />
                  <Bar dataKey="tasks" fill="#06b6d4" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="font-semibold text-lg mb-6 dark:text-white text-slate-900">Tasks by Priority</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: '#e2e8f0',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-4">
              {pieData.map((item, index) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  <span className="text-sm text-slate-500">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}