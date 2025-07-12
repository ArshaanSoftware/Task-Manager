'use client';

import { useState } from 'react';
import { Task, TaskFilters } from '@/types/task';
import { useTasks } from '@/hooks/useTasks';
import { TaskCard } from '@/components/TaskCard';
import { TaskForm } from '@/components/TaskForm';
import { TaskFiltersComponent } from '@/components/TaskFilters';
import { TaskStatsComponent } from '@/components/TaskStats';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Layout, CheckSquare } from 'lucide-react';

export default function Home() {
  const {
    tasks,
    isLoading,
    createTask,
    updateTask,
    deleteTask,
    getTaskStats,
    getFilteredTasks,
    getCategories,
  } = useTasks();

  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filters, setFilters] = useState<TaskFilters>({
    search: '',
    status: 'all',
    priority: 'all',
    category: '',
  });

  const handleCreateTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    createTask(taskData);
    setShowTaskForm(false);
  };

  const handleUpdateTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
      setEditingTask(null);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowTaskForm(false);
  };

  const handleStatusChange = (id: string, status: Task['status']) => {
    updateTask(id, { status });
  };

  const handleCancelForm = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  const filteredTasks = getFilteredTasks(filters);
  const stats = getTaskStats();
  const categories = getCategories();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-xl">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-black p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <CheckSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Task Manager</h1>
                <p className="text-gray-300">Organize your work with style</p>
              </div>
            </div>
            <Button
              onClick={() => setShowTaskForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={showTaskForm || !!editingTask}
            >
              <Plus className="w-4 h-4 mr-2" />
              New Task
            </Button>
          </div>

          {/* Stats */}
          <TaskStatsComponent stats={stats} />

          {/* Filters */}
          <TaskFiltersComponent
            filters={filters}
            onFiltersChange={setFilters}
            categories={categories}
          />
        </div>

        {/* Task Form */}
        {(showTaskForm || editingTask) && (
          <div className="mb-6">
            <TaskForm
              task={editingTask || undefined}
              onSave={editingTask ? handleUpdateTask : handleCreateTask}
              onCancel={handleCancelForm}
              categories={categories}
            />
          </div>
        )}

        {/* Task List */}
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="py-12 text-center">
                <Layout className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">
                  {tasks.length === 0 ? 'No tasks yet' : 'No tasks match your filters'}
                </h3>
                <p className="text-gray-400">
                  {tasks.length === 0 
                    ? 'Create your first task to get started!' 
                    : 'Try adjusting your search or filter criteria'
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={deleteTask}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}