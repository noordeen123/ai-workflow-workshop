import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Board } from '../types';
import { apiService } from '../services/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Plus, LogOut, Trash2 } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');
  const [newBoardDescription, setNewBoardDescription] = useState('');
  const [error, setError] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const boardsData = await apiService.getBoards();
      setBoards(boardsData);
    } catch (error) {
      setError('Failed to fetch boards');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateBoard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBoardName.trim()) return;

    setIsCreating(true);
    setError('');

    try {
      const newBoard = await apiService.createBoard({
        name: newBoardName,
        description: newBoardDescription || undefined,
      });
      setBoards([...boards, newBoard]);
      setNewBoardName('');
      setNewBoardDescription('');
      setShowCreateForm(false);
    } catch (error) {
      setError('Failed to create board');
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteBoard = async (boardId: string) => {
    if (!confirm('Are you sure you want to delete this board? This action cannot be undone.')) {
      return;
    }

    try {
      await apiService.deleteBoard(boardId);
      setBoards(boards.filter(board => board.id !== boardId));
    } catch (error) {
      setError('Failed to delete board');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-gray-600">Loading your boards...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">TaskFlow</h1>
              <p className="text-sm text-gray-600">Welcome back, {user?.firstName}!</p>
            </div>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Your Boards</h2>
            <p className="text-sm text-gray-600">
              Organize your tasks with kanban boards
            </p>
          </div>
          <Button onClick={() => setShowCreateForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Board
          </Button>
        </div>

        {error && (
          <div className="mb-6 rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        {/* Create Board Form */}
        {showCreateForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Create New Board</CardTitle>
              <CardDescription>
                Give your board a name and optional description
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateBoard} className="space-y-4">
                <div>
                  <label htmlFor="boardName" className="block text-sm font-medium text-gray-700">
                    Board Name
                  </label>
                  <Input
                    id="boardName"
                    type="text"
                    required
                    value={newBoardName}
                    onChange={(e) => setNewBoardName(e.target.value)}
                    placeholder="Enter board name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label htmlFor="boardDescription" className="block text-sm font-medium text-gray-700">
                    Description (optional)
                  </label>
                  <Input
                    id="boardDescription"
                    type="text"
                    value={newBoardDescription}
                    onChange={(e) => setNewBoardDescription(e.target.value)}
                    placeholder="Enter board description"
                    className="mt-1"
                  />
                </div>
                <div className="flex space-x-3">
                  <Button type="submit" disabled={isCreating}>
                    {isCreating ? 'Creating...' : 'Create Board'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowCreateForm(false);
                      setNewBoardName('');
                      setNewBoardDescription('');
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Boards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {boards.map((board) => (
            <Card key={board.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{board.name}</CardTitle>
                    {board.description && (
                      <CardDescription className="mt-1">
                        {board.description}
                      </CardDescription>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteBoard(board.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Created {new Date(board.createdAt).toLocaleDateString()}</span>
                  <Link
                    to={`/board/${board.id}`}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Open →
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {boards.length === 0 && !showCreateForm && (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Plus className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No boards yet</h3>
            <p className="text-gray-600 mb-4">
              Create your first board to start organizing your tasks
            </p>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Board
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};