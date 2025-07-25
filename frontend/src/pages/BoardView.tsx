import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { Board, Task, TaskStatus, TaskPriority } from '../types';
import { apiService } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { ArrowLeft, Plus, LogOut } from 'lucide-react';
import { KanbanColumn } from '../components/KanbanColumn';
import { TaskCard } from '../components/TaskCard';
import { CreateTaskModal } from '../components/CreateTaskModal';

export const BoardView: React.FC = () => {
  const { boardId } = useParams<{ boardId: string }>();
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const [board, setBoard] = useState<Board | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  useEffect(() => {
    if (boardId) {
      fetchBoard();
      fetchTasks();
    }
  }, [boardId]);

  const fetchBoard = async () => {
    if (!boardId) return;
    
    try {
      const boardData = await apiService.getBoard(boardId);
      setBoard(boardData);
    } catch (error) {
      setError('Failed to fetch board');
    }
  };

  const fetchTasks = async () => {
    if (!boardId) return;
    
    try {
      const tasksData = await apiService.getTasks(boardId);
      setTasks(tasksData);
    } catch (error) {
      setError('Failed to fetch tasks');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeTask = tasks.find(task => task.id === activeId);
    if (!activeTask) return;

    // Check if we're over a column or a task
    const overTask = tasks.find(task => task.id === overId);
    const overColumn = overId as TaskStatus;

    if (overTask) {
      // Dragging over a task - move to that task's status
      if (activeTask.status !== overTask.status) {
        setTasks(tasks => {
          const updatedTasks = tasks.map(task =>
            task.id === activeId 
              ? { ...task, status: overTask.status }
              : task
          );
          return updatedTasks;
        });
      }
    } else if (Object.values(TaskStatus).includes(overColumn)) {
      // Dragging over a column - move to that column
      if (activeTask.status !== overColumn) {
        setTasks(tasks => {
          const updatedTasks = tasks.map(task =>
            task.id === activeId 
              ? { ...task, status: overColumn }
              : task
          );
          return updatedTasks;
        });
      }
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over || !boardId) return;

    const activeId = active.id as string;
    const activeTask = tasks.find(task => task.id === activeId);
    if (!activeTask) return;

    try {
      await apiService.updateTask(boardId, activeId, {
        status: activeTask.status,
      });
    } catch (error) {
      setError('Failed to update task status');
      // Revert the change
      fetchTasks();
    }
  };

  const handleCreateTask = async (taskData: { title: string; description?: string; priority?: TaskPriority; status?: TaskStatus }) => {
    if (!boardId) return;

    try {
      const newTask = await apiService.createTask(boardId, taskData);
      setTasks([...tasks, newTask]);
      setShowCreateModal(false);
    } catch (error) {
      setError('Failed to create task');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!boardId) return;

    try {
      await apiService.deleteTask(boardId, taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      setError('Failed to delete task');
    }
  };

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter(task => task.status === status);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-gray-600">Loading board...</div>
      </div>
    );
  }

  if (!board) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Board not found</h2>
          <p className="text-gray-600 mb-4">The board you're looking for doesn't exist.</p>
          <Link to="/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  const activeTask = activeId ? tasks.find(task => task.id === activeId) : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{board.name}</h1>
                {board.description && (
                  <p className="text-sm text-gray-600">{board.description}</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button onClick={() => setShowCreateModal(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Task
              </Button>
              <Button onClick={handleLogout} variant="outline" size="sm">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Error Message */}
      {error && (
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        </div>
      )}

      {/* Kanban Board */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <KanbanColumn
              status={TaskStatus.TODO}
              title="To Do"
              tasks={getTasksByStatus(TaskStatus.TODO)}
              onDeleteTask={handleDeleteTask}
            />
            <KanbanColumn
              status={TaskStatus.IN_PROGRESS}
              title="In Progress"
              tasks={getTasksByStatus(TaskStatus.IN_PROGRESS)}
              onDeleteTask={handleDeleteTask}
            />
            <KanbanColumn
              status={TaskStatus.COMPLETED}
              title="Completed"
              tasks={getTasksByStatus(TaskStatus.COMPLETED)}
              onDeleteTask={handleDeleteTask}
            />
          </div>

          <DragOverlay>
            {activeTask ? <TaskCard task={activeTask} isDragging /> : null}
          </DragOverlay>
        </DndContext>
      </main>

      {/* Create Task Modal */}
      {showCreateModal && (
        <CreateTaskModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateTask}
        />
      )}
    </div>
  );
};