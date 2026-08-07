import { create } from 'zustand'
import { Column, Task } from '../types'
import { initialColumns } from '../data'

interface BoardStore {
  columns: Column[]
  searchQuery: string
  filterPriority: 'all' | 'low' | 'medium' | 'high'
  moveTask: (sourceColId: string, destColId: string, sourceIndex: number, destIndex: number) => void
  addTask: (columnId: string, task: Task) => void
  deleteTask: (columnId: string, taskId: string) => void
  setSearchQuery: (q: string) => void
  setFilterPriority: (p: 'all' | 'low' | 'medium' | 'high') => void
}

export const useBoardStore = create<BoardStore>((set) => ({
  columns: initialColumns,
  searchQuery: '',
  filterPriority: 'all',
  
  moveTask: (sourceColId, destColId, sourceIndex, destIndex) =>
    set((state) => {
      const newColumns = state.columns.map(col => ({ ...col, tasks: [...col.tasks] }))
      const sourceCol = newColumns.find((c) => c.id === sourceColId)
      const destCol = newColumns.find((c) => c.id === destColId)
      if (!sourceCol || !destCol) return state

      const [movedTask] = sourceCol.tasks.splice(sourceIndex, 1)
      destCol.tasks.splice(destIndex, 0, movedTask)
      return { columns: newColumns }
    }),
    
  addTask: (columnId, task) =>
    set((state) => ({
      columns: state.columns.map((col) =>
        col.id === columnId ? { ...col, tasks: [...col.tasks, task] } : col
      ),
    })),
    
  deleteTask: (columnId, taskId) =>
    set((state) => ({
      columns: state.columns.map((col) =>
        col.id === columnId
          ? { ...col, tasks: col.tasks.filter((t) => t.id !== taskId) }
          : col
      ),
    })),
    
  setSearchQuery: (q) => set({ searchQuery: q }),
  setFilterPriority: (p) => set({ filterPriority: p }),
}))