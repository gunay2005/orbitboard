import { Draggable, DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd'
import { Calendar, Trash2 } from 'lucide-react'
import { Task } from '../types'
import { useBoardStore } from '../store/useBoardStore'

interface Props {
  task: Task
  index: number
  columnId: string
}

const priorityColors = {
  low: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  medium: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  high: 'bg-red-500/10 text-red-400 border-red-500/20',
}

export default function TaskCard({ task, index, columnId }: Props) {
  const { deleteTask } = useBoardStore()

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={provided.draggableProps.style}
          className={`group p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/[0.07] transition-all ${
            snapshot.isDragging ? 'rotate-2 shadow-2xl bg-white/10 border-cyan-500/30 z-50' : ''
          }`}
        >
          <div className="flex items-start justify-between mb-2">
            <span className={`px-2 py-0.5 rounded-md text-xs font-medium border ${priorityColors[task.priority]}`}>
              {task.priority}
            </span>
            <button
              onClick={() => deleteTask(columnId, task.id)}
              className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition p-1"
            >
              <Trash2 size={12} />
            </button>
          </div>

          <h4 className="font-medium text-sm mb-1 leading-snug text-slate-200">{task.title}</h4>
          <p className="text-xs text-slate-500 mb-3" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {task.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-3">
            {task.tags.map((tag) => (
              <span key={tag} className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-slate-400">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Calendar size={12} />
              <span>{task.dueDate}</span>
            </div>
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-[10px] font-bold text-white">
              {task.assigneeAvatar}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}