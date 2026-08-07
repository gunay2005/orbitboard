export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  assigneeAvatar: string;
  tags: string[];
  dueDate: string;
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}