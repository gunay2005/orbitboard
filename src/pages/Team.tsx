import { motion } from 'framer-motion'
import { Mail, MoreHorizontal, Shield, User } from 'lucide-react'

const members = [
  { name: 'Gunay Sadıxova', role: 'Frontend Lead', avatar: 'GS', color: 'from-cyan-400 to-blue-600', email: 'gunay@orbit.app' },
  { name: 'Alex Chen', role: 'Product Designer', avatar: 'AC', color: 'from-violet-400 to-fuchsia-600', email: 'alex@orbit.app' },
  { name: 'Maria Garcia', role: 'Backend Engineer', avatar: 'MG', color: 'from-emerald-400 to-teal-600', email: 'maria@orbit.app' },
  { name: 'John Doe', role: 'DevOps', avatar: 'JD', color: 'from-amber-400 to-orange-600', email: 'john@orbit.app' },
  { name: 'Sarah Kim', role: 'QA Engineer', avatar: 'SK', color: 'from-rose-400 to-pink-600', email: 'sarah@orbit.app' },
]

export default function Team() {
  return (
    <div className="h-full overflow-y-auto p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold dark:text-white text-slate-900">Team Members</h3>
              <p className="text-sm text-slate-500">Manage your team and permissions</p>
            </div>
            <button className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-medium text-sm transition">
              Invite Member
            </button>
          </div>

          <div className="space-y-3">
            {members.map((member, index) => (
              <motion.div
                key={member.email}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition group"
              >
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}>
                  {member.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium dark:text-white text-slate-900">{member.name}</p>
                  <p className="text-xs text-slate-500">{member.role}</p>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
                  <Mail size={12} />
                  <span className="truncate max-w-[150px]">{member.email}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-slate-500 transition">
                    <Shield size={16} />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-slate-500 transition">
                    <MoreHorizontal size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}