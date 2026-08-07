import { Droppable, DroppableProvided, DroppableStateSnapshot } from '@hello-pangea/dnd'
import { Column } from '../types'
import TaskCard from './TaskCard'

interface Props {
  column: Column
}

const columnColors: Record<string, string> = {
  todo: 'border-t-cyan-500/50',
  inprogress: 'border-t-amber-500/50',
  review: 'border-t-violet-500/50',
  done: 'border-t-emerald-500/50',
}

export default function KanbanColumn({ column }: Props) {
  return (
    <div className={`flex flex-col rounded-2xl bg-white/[0.02] border border-white/5 border-t-4 ${columnColors[column.id] || 'border-t-white/10'} min-w-[280px] md:min-w-[300px] max-w-[300px] h-full`}>
      <div className="flex items-center justify-between p-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-sm">{column.title}</h3>
          <span className="px-2 py-0.5 rounded-full bg-white/5 text-xs text-slate-500">
            {column.tasks.length}
          </span>
        </div>
      </div>

      <Droppable droppableId={column.id}>
        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 p-3 space-y-3 overflow-y-auto rounded-b-2xl transition-colors ${
              snapshot.isDraggingOver ? 'bg-white/5' : ''
            }`}
          >
            {column.tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} columnId={column.id} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}