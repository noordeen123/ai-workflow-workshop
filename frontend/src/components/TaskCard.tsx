import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task, TaskPriority } from '../types';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { Trash2, GripVertical } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onDelete?: () => void;
  isDragging?: boolean;
}

const priorityColors = {
  [TaskPriority.LOW]: 'border-l-gray-400',
  [TaskPriority.MEDIUM]: 'border-l-yellow-400',
  [TaskPriority.HIGH]: 'border-l-red-400',
};

const priorityLabels = {
  [TaskPriority.LOW]: 'Low',
  [TaskPriority.MEDIUM]: 'Medium',
  [TaskPriority.HIGH]: 'High',
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, isDragging = false }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging || isSortableDragging ? 0.5 : 1,
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete && confirm('Are you sure you want to delete this task?')) {
      onDelete();
    }
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card 
        className={`group cursor-grab border-l-4 ${priorityColors[task.priority]} hover:shadow-md transition-shadow`}
        {...attributes}
      >
        <CardContent className="p-3">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {task.title}
              </h3>
              {task.description && (
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                  {task.description}
                </p>
              )}
            </div>
            <div className="flex items-center ml-2 space-x-1">
              <div
                {...listeners}
                className="opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
              >
                <GripVertical className="h-4 w-4 text-gray-400" />
              </div>
              {onDelete && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDelete}
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between text-xs">
            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
              task.priority === TaskPriority.HIGH
                ? 'bg-red-100 text-red-800'
                : task.priority === TaskPriority.MEDIUM
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {priorityLabels[task.priority]}
            </span>
            <span className="text-gray-500">
              {new Date(task.createdAt).toLocaleDateString()}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};