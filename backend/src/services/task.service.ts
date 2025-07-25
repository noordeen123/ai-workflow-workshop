import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { Board } from '../entities/board.entity';
import { CreateTaskDto, UpdateTaskDto, TaskResponseDto } from '../dto/task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  async create(boardId: number, createTaskDto: CreateTaskDto, userId: number): Promise<TaskResponseDto> {
    // Verify board exists and belongs to user
    const board = await this.boardRepository.findOne({ where: { id: boardId } });
    if (!board) {
      throw new NotFoundException('Board not found');
    }
    if (board.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    // Get the next position for the task in its status column
    const maxPosition = await this.taskRepository
      .createQueryBuilder('task')
      .select('MAX(task.position)', 'max')
      .where('task.boardId = :boardId', { boardId })
      .andWhere('task.status = :status', { status: createTaskDto.status || 'todo' })
      .getRawOne();

    const position = (maxPosition?.max || -1) + 1;

    const task = this.taskRepository.create({
      ...createTaskDto,
      boardId,
      position,
    });

    const savedTask = await this.taskRepository.save(task);
    return this.formatTaskResponse(savedTask);
  }

  async findAllByBoard(boardId: number, userId: number): Promise<TaskResponseDto[]> {
    // Verify board belongs to user
    const board = await this.boardRepository.findOne({ where: { id: boardId } });
    if (!board) {
      throw new NotFoundException('Board not found');
    }
    if (board.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    const tasks = await this.taskRepository.find({
      where: { boardId },
      order: { status: 'ASC', position: 'ASC' },
    });

    return tasks.map(task => this.formatTaskResponse(task));
  }

  async findOne(id: number, userId: number): Promise<TaskResponseDto> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['board'],
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.board.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return this.formatTaskResponse(task);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, userId: number): Promise<TaskResponseDto> {
    const task = await this.findOne(id, userId);
    
    // If status is changing, recalculate position
    if (updateTaskDto.status && updateTaskDto.status !== task.status) {
      const maxPosition = await this.taskRepository
        .createQueryBuilder('task')
        .select('MAX(task.position)', 'max')
        .where('task.boardId = :boardId', { boardId: task.boardId })
        .andWhere('task.status = :status', { status: updateTaskDto.status })
        .getRawOne();

      updateTaskDto.position = (maxPosition?.max || -1) + 1;
    }

    await this.taskRepository.update(id, updateTaskDto);
    const updatedTask = await this.taskRepository.findOne({ where: { id } });
    
    return this.formatTaskResponse(updatedTask!);
  }

  async remove(id: number, userId: number): Promise<void> {
    const task = await this.findOne(id, userId);
    await this.taskRepository.delete(id);
  }

  async updatePositions(boardId: number, updates: { id: number; status: string; position: number }[], userId: number): Promise<void> {
    // Verify board belongs to user
    const board = await this.boardRepository.findOne({ where: { id: boardId } });
    if (!board || board.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    // Update all task positions in a transaction
    await this.taskRepository.manager.transaction(async manager => {
      for (const update of updates) {
        await manager.update(Task, update.id, {
          status: update.status as any,
          position: update.position,
        });
      }
    });
  }

  private formatTaskResponse(task: Task): TaskResponseDto {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      position: task.position,
      boardId: task.boardId,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }
}