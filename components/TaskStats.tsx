'use client';

import { TaskStats } from '@/types/task';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  CheckCircle, 
  Clock, 
  Circle, 
  TrendingUp, 
  AlertTriangle 
} from 'lucide-react';

interface TaskStatsProps {
  stats: TaskStats;
}

export const TaskStatsComponent = ({ stats }: TaskStatsProps) => {
  const statCards = [
    {
      title: 'Total Tasks',
      value: stats.total,
      icon: TrendingUp,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/20',
      borderColor: 'border-blue-500/30',
    },
    {
      title: 'Completed',
      value: stats.completed,
      icon: CheckCircle,
      color: 'text-green-400',
      bgColor: 'bg-green-500/20',
      borderColor: 'border-green-500/30',
    },
    {
      title: 'In Progress',
      value: stats.inProgress,
      icon: Clock,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/20',
      borderColor: 'border-yellow-500/30',
    },
    {
      title: 'To Do',
      value: stats.todo,
      icon: Circle,
      color: 'text-gray-400',
      bgColor: 'bg-gray-500/20',
      borderColor: 'border-gray-500/30',
    },
    {
      title: 'Overdue',
      value: stats.overdue,
      icon: AlertTriangle,
      color: 'text-red-400',
      bgColor: 'bg-red-500/20',
      borderColor: 'border-red-500/30',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {statCards.map((stat) => (
        <Card 
          key={stat.title}
          className={`bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 ${stat.bgColor} ${stat.borderColor}`}
        >
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span className="text-sm font-medium text-white">{stat.title}</span>
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            {stats.total > 0 && (
              <p className="text-xs text-gray-400 mt-1">
                {Math.round((stat.value / stats.total) * 100)}%
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};