import { DragDropContext, DropResult } from '@hello-pangea/dnd'
import { useBoardStore } from '../store/useBoardStore'
import KanbanColumn from './KanbanColumn'

export default function KanbanBoard() {
  const { columns, moveTask } = useBoardStore()

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination) return
    if (source.droppableId === destination.droppableId && source.index === destination.index) return

    moveTask(source.droppableId, destination.droppableId, source.index, destination.index)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="flex gap-4 p-4 md:p-6 min-w-max h-full">
          {columns.map((column) => (
            <KanbanColumn key={column.id} column={column} />
          ))}
        </div>
      </div>
    </DragDropContext>
  )
}