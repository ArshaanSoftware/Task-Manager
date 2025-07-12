export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  category: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskStats {
  total: number;
  completed: number;
  inProgress: number;
  todo: number;
  overdue: number;
}

export interface TaskFilters {
  search: string;
  status: 'all' | 'todo' | 'in-progress' | 'completed';
  priority: 'all' | 'low' | 'medium' | 'high';
  category: string;
}