'use client';

import { Task } from '@/types/task';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  Edit, 
  Trash2, 
  Flag,
  CheckCircle,
  Circle,
  PlayCircle
} from 'lucide-react';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Task['status']) => void;
}

export const TaskCard = ({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) => {
  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-300 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'in-progress': return <PlayCircle className="w-4 h-4 text-blue-400" />;
      case 'todo': return <Circle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'in-progress': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'todo': return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const isOverdue = () => {
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    return dueDate < today && task.status !== 'completed';
  };

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold text-white group-hover:text-blue-200 transition-colors">
            {task.title}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(task)}
              className="h-8 w-8 p-0 hover:bg-white/20 text-white hover:text-blue-200"
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(task.id)}
              className="h-8 w-8 p-0 hover:bg-red-500/20 text-white hover:text-red-300"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-300 text-sm leading-relaxed">
          {task.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          <Badge className={getPriorityColor(task.priority)}>
            <Flag className="w-3 h-3 mr-1" />
            {task.priority}
          </Badge>
          <Badge className={getStatusColor(task.status)}>
            {getStatusIcon(task.status)}
            <span className="ml-1">{task.status}</span>
          </Badge>
          {task.category && (
            <Badge variant="outline" className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
              {task.category}
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span className={isOverdue() ? 'text-red-400' : ''}>
              {format(new Date(task.dueDate), 'MMM dd, yyyy')}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{format(new Date(task.createdAt), 'MMM dd')}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onStatusChange(task.id, 'todo')}
            className="flex-1 bg-gray-500/20 border-gray-500/30 text-gray-300 hover:bg-gray-500/30"
            disabled={task.status === 'todo'}
          >
            To Do
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onStatusChange(task.id, 'in-progress')}
            className="flex-1 bg-blue-500/20 border-blue-500/30 text-blue-300 hover:bg-blue-500/30"
            disabled={task.status === 'in-progress'}
          >
            In Progress
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onStatusChange(task.id, 'completed')}
            className="flex-1 bg-green-500/20 border-green-500/30 text-green-300 hover:bg-green-500/30"
            disabled={task.status === 'completed'}
          >
            Complete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};