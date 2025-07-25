import { 
  User, 
  Board, 
  Task, 
  CreateUserDto, 
  LoginDto, 
  CreateBoardDto, 
  UpdateBoardDto, 
  CreateTaskDto, 
  UpdateTaskDto, 
  AuthResponse 
} from './types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiService {
  private getHeaders(): HeadersInit {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }
    return response.json();
  }

  // Auth endpoints
  async register(userData: CreateUserDto): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(userData),
    });
    return this.handleResponse<AuthResponse>(response);
  }

  async login(credentials: LoginDto): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(credentials),
    });
    return this.handleResponse<AuthResponse>(response);
  }

  async getProfile(): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return this.handleResponse<User>(response);
  }

  // Board endpoints
  async getBoards(): Promise<Board[]> {
    const response = await fetch(`${API_BASE_URL}/boards`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return this.handleResponse<Board[]>(response);
  }

  async getBoard(id: string): Promise<Board> {
    const response = await fetch(`${API_BASE_URL}/boards/${id}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return this.handleResponse<Board>(response);
  }

  async createBoard(boardData: CreateBoardDto): Promise<Board> {
    const response = await fetch(`${API_BASE_URL}/boards`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(boardData),
    });
    return this.handleResponse<Board>(response);
  }

  async updateBoard(id: string, boardData: UpdateBoardDto): Promise<Board> {
    const response = await fetch(`${API_BASE_URL}/boards/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(boardData),
    });
    return this.handleResponse<Board>(response);
  }

  async deleteBoard(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/boards/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }
  }

  // Task endpoints
  async getTasks(boardId: string): Promise<Task[]> {
    const response = await fetch(`${API_BASE_URL}/boards/${boardId}/tasks`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return this.handleResponse<Task[]>(response);
  }

  async getTask(boardId: string, taskId: string): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/boards/${boardId}/tasks/${taskId}`, {
      method: 'GET',
      headers: this.getHeaders(),
    });
    return this.handleResponse<Task>(response);
  }

  async createTask(boardId: string, taskData: CreateTaskDto): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/boards/${boardId}/tasks`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(taskData),
    });
    return this.handleResponse<Task>(response);
  }

  async updateTask(boardId: string, taskId: string, taskData: UpdateTaskDto): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/boards/${boardId}/tasks/${taskId}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(taskData),
    });
    return this.handleResponse<Task>(response);
  }

  async deleteTask(boardId: string, taskId: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/boards/${boardId}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: this.getHeaders(),
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error);
    }
  }
}

export const apiService = new ApiService();