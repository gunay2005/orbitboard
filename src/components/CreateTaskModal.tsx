import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useBoardStore } from '../store/useBoardStore'

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  priority: z.enum(['low', 'medium', 'high']),
  assignee: z.string().min(1, 'Assignee is required'),
  tags: z.string(),
  dueDate: z.string(),
})

type FormData = z.infer<typeof schema>

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function CreateTaskModal({ isOpen, onClose }: Props) {
  const { addTask } = useBoardStore()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      priority: 'medium',
      dueDate: new Date().toISOString().split('T')[0],
    },
  })

  const onSubmit = (data: FormData) => {
    const initials = data.assignee
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)

    const task = {
      id: `t-${Date.now()}`,
      title: data.title,
      description: data.description,
      priority: data.priority,
      assignee: data.assignee,
      assigneeAvatar: initials || '??',
      tags: data.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      dueDate: data.dueDate,
    }

    addTask('todo', task)
    reset()
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-white dark:bg-slate-900 border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Create New Task</h3>
              <button onClick={onClose} className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded transition">
                <X size={18} className="text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm text-slate-500 mb-1">Title</label>
                <input
                  {...register('title')}
                  className="w-full px-3 py-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm outline-none focus:border-cyan-500/50 text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                  placeholder="Task title"
                />
                {errors.title && (
                  <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-slate-500 mb-1">Description</label>
                <textarea
                  {...register('description')}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm outline-none focus:border-cyan-500/50 resize-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                  placeholder="Task description"
                />
                {errors.description && (
                  <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-500 mb-1">Priority</label>
                  <select
                    {...register('priority')}
                    className="w-full px-3 py-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm outline-none focus:border-cyan-500/50 text-slate-900 dark:text-slate-100"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-slate-500 mb-1">Due Date</label>
                  <input
                    type="date"
                    {...register('dueDate')}
                    className="w-full px-3 py-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm outline-none focus:border-cyan-500/50 text-slate-900 dark:text-slate-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-slate-500 mb-1">Assignee</label>
                <input
                  {...register('assignee')}
                  className="w-full px-3 py-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm outline-none focus:border-cyan-500/50 text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                  placeholder="Full name"
                />
                {errors.assignee && (
                  <p className="text-red-500 text-xs mt-1">{errors.assignee.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-slate-500 mb-1">Tags (comma separated)</label>
                <input
                  {...register('tags')}
                  className="w-full px-3 py-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm outline-none focus:border-cyan-500/50 text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                  placeholder="Frontend, Bug, UI"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm font-medium hover:bg-black/10 dark:hover:bg-white/10 transition text-slate-900 dark:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-medium text-sm transition"
                >
                  Create Task
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}