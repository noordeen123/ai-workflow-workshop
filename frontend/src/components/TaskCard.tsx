import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task, TaskPriority } from '../types';
import { Card, CardContent, CardHeader } from './ui/Card';
import { Button } from './ui/Button';
import { Trash2, GripVertical } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onDelete?: () => void;
  isDragging?: boolean;
}

const priorityColors = {
  [TaskPriority.LOW]: 'border-l-green-400 bg-green-50',
  [TaskPriority.MEDIUM]: 'border-l-yellow-400 bg-yellow-50',
  [TaskPriority.HIGH]: 'border-l-red-400 bg-red-50',
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

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`border-l-4 ${priorityColors[task.priority]} hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing`}
      {...attributes}
      {...listeners}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="text-sm font-medium text-gray-900 leading-tight">
              {task.title}
            </h4>
            {task.description && (
              <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                {task.description}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-1 ml-2">
            <GripVertical className="h-3 w-3 text-gray-400" />
            {onDelete && (
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                className="h-6 w-6 text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            task.priority === TaskPriority.HIGH 
              ? 'bg-red-100 text-red-800'
              : task.priority === TaskPriority.MEDIUM
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-green-100 text-green-800'
          }`}>
            {priorityLabels[task.priority]}
          </span>
          <span className="text-xs text-gray-500">
            {new Date(task.createdAt).toLocaleDateString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};