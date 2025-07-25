import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Task, TaskStatus } from '../types';
import { TaskCard } from './TaskCard';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';

interface KanbanColumnProps {
  status: TaskStatus;
  title: string;
  tasks: Task[];
  onDeleteTask: (taskId: string) => void;
}

const statusColors = {
  [TaskStatus.TODO]: 'border-blue-200 bg-blue-50',
  [TaskStatus.IN_PROGRESS]: 'border-yellow-200 bg-yellow-50',
  [TaskStatus.COMPLETED]: 'border-green-200 bg-green-50',
};

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  status,
  title,
  tasks,
  onDeleteTask,
}) => {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
  });

  return (
    <Card className={`${statusColors[status]} ${isOver ? 'ring-2 ring-blue-400' : ''}`}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-sm font-medium text-gray-700">
          {title}
          <span className="ml-2 rounded-full bg-white px-2 py-1 text-xs text-gray-600">
            {tasks.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div
          ref={setNodeRef}
          className="min-h-[400px] space-y-3"
        >
          <SortableContext items={tasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={() => onDeleteTask(task.id)}
              />
            ))}
          </SortableContext>
          {tasks.length === 0 && (
            <div className="flex items-center justify-center h-32 text-gray-400 text-sm">
              Drop tasks here
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};