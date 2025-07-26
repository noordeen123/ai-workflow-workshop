import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Task, TaskStatus } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { TaskCard } from './TaskCard';

interface KanbanColumnProps {
  status: TaskStatus;
  title: string;
  tasks: Task[];
  onDeleteTask: (taskId: string) => void;
}

const statusColors = {
  [TaskStatus.TODO]: 'border-t-blue-500 bg-blue-50',
  [TaskStatus.IN_PROGRESS]: 'border-t-yellow-500 bg-yellow-50',
  [TaskStatus.COMPLETED]: 'border-t-green-500 bg-green-50',
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
    <Card className={`border-t-4 ${statusColors[status]} ${isOver ? 'ring-2 ring-blue-300' : ''}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center justify-between">
          {title}
          <span className="bg-slate-200 text-slate-700 text-sm font-medium px-2 py-1 rounded-full">
            {tasks.length}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          ref={setNodeRef}
          className="space-y-3 min-h-[200px]"
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
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">No tasks yet</p>
              <p className="text-xs">Drag tasks here or create new ones</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};