import { Column, ChatMessage } from './types'

export const initialColumns: Column[] = [
  {
    id: 'todo',
    title: 'To Do',
    tasks: [
      {
        id: 't1',
        title: 'Design System Audit',
        description: 'Review and update component library',
        priority: 'high',
        assignee: 'Alex Chen',
        assigneeAvatar: 'AC',
        tags: ['Design', 'UI'],
        dueDate: '2026-08-10',
      },
      {
        id: 't2',
        title: 'API Integration',
        description: 'Connect frontend with REST endpoints',
        priority: 'medium',
        assignee: 'Maria Garcia',
        assigneeAvatar: 'MG',
        tags: ['Backend', 'API'],
        dueDate: '2026-08-12',
      },
    ],
  },
  {
    id: 'inprogress',
    title: 'In Progress',
    tasks: [
      {
        id: 't3',
        title: 'Kanban Board Implementation',
        description: 'Build drag-and-drop task board',
        priority: 'high',
        assignee: 'Gunay Sadıxova',
        assigneeAvatar: 'GS',
        tags: ['Frontend', 'React'],
        dueDate: '2026-08-08',
      },
    ],
  },
  {
    id: 'review',
    title: 'Review',
    tasks: [
      {
        id: 't4',
        title: 'Dark Mode Toggle',
        description: 'Implement theme switching',
        priority: 'low',
        assignee: 'John Doe',
        assigneeAvatar: 'JD',
        tags: ['UI', 'UX'],
        dueDate: '2026-08-15',
      },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [
      {
        id: 't5',
        title: 'Project Setup',
        description: 'Initialize repo and dependencies',
        priority: 'medium',
        assignee: 'Gunay Sadıxova',
        assigneeAvatar: 'GS',
        tags: ['Setup'],
        dueDate: '2026-08-05',
      },
    ],
  },
]

export const initialChatMessages: ChatMessage[] = [
  {
    id: 'c1',
    role: 'assistant',
    content: 'Hello! I am Orbit AI. How can I help you manage your projects today?',
    timestamp: new Date(),
  },
]

export const mockAIResponses = [
  'I analyzed your tasks. You have 2 high-priority items due this week.',
  'Based on your team velocity, this sprint looks achievable.',
  'Would you like me to generate a summary report for the stakeholders?',
  'I noticed the API Integration task is blocking 3 other tasks.',
  'Tip: Consider breaking down the Design System Audit into smaller subtasks.',
]