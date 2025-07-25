import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from '../entities/task.entity';
import { Board } from '../entities/board.entity';
import { CreateTaskDto, UpdateTaskDto, UpdateTaskPositionDto } from '../dto/task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  async create(createTaskDto: CreateTaskDto, boardId: number, userId: number): Promise<Task> {
    await this.validateBoardOwnership(boardId, userId);

    // Get the highest position for the given status
    const status = createTaskDto.status || TaskStatus.TODO;
    const maxPosition = await this.taskRepository
      .createQueryBuilder('task')
      .select('MAX(task.position)', 'maxPosition')
      .where('task.boardId = :boardId AND task.status = :status', { boardId, status })
      .getRawOne();

    const position = createTaskDto.position ?? ((maxPosition?.maxPosition ?? -1) + 1);

    const task = this.taskRepository.create({
      ...createTaskDto,
      boardId,
      status,
      position,
    });

    return this.taskRepository.save(task);
  }

  async findAllByBoard(boardId: number, userId: number): Promise<Task[]> {
    await this.validateBoardOwnership(boardId, userId);

    return this.taskRepository.find({
      where: { boardId },
      order: { position: 'ASC' },
    });
  }

  async findOne(id: number, userId: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['board'],
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.board.userId !== userId) {
      throw new ForbiddenException('You do not have access to this task');
    }

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto, userId: number): Promise<Task> {
    const task = await this.findOne(id, userId);
    
    Object.assign(task, updateTaskDto);
    return this.taskRepository.save(task);
  }

  async updatePosition(id: number, updatePositionDto: UpdateTaskPositionDto, userId: number): Promise<Task> {
    const task = await this.findOne(id, userId);
    const { status, position } = updatePositionDto;

    // If status changed, we need to reorder tasks in both old and new columns
    if (task.status !== status) {
      // Remove from old column
      await this.reorderTasks(task.boardId, task.status, task.position, -1);
      
      // Add to new column
      await this.reorderTasks(task.boardId, status, position, 1);
    } else {
      // Same column, just reorder
      if (task.position < position) {
        // Moving down
        await this.taskRepository
          .createQueryBuilder()
          .update(Task)
          .set({ position: () => 'position - 1' })
          .where('boardId = :boardId AND status = :status AND position > :oldPos AND position <= :newPos', {
            boardId: task.boardId,
            status,
            oldPos: task.position,
            newPos: position,
          })
          .execute();
      } else if (task.position > position) {
        // Moving up
        await this.taskRepository
          .createQueryBuilder()
          .update(Task)
          .set({ position: () => 'position + 1' })
          .where('boardId = :boardId AND status = :status AND position >= :newPos AND position < :oldPos', {
            boardId: task.boardId,
            status,
            newPos: position,
            oldPos: task.position,
          })
          .execute();
      }
    }

    task.status = status;
    task.position = position;
    
    return this.taskRepository.save(task);
  }

  async remove(id: number, userId: number): Promise<void> {
    const task = await this.findOne(id, userId);
    
    // Reorder remaining tasks
    await this.reorderTasks(task.boardId, task.status, task.position, -1);
    
    await this.taskRepository.remove(task);
  }

  private async reorderTasks(boardId: number, status: TaskStatus, fromPosition: number, direction: 1 | -1): Promise<void> {
    const operator = direction === 1 ? '+' : '-';
    const comparison = direction === 1 ? '>=' : '>';
    
    await this.taskRepository
      .createQueryBuilder()
      .update(Task)
      .set({ position: () => `position ${operator} 1` })
      .where(`boardId = :boardId AND status = :status AND position ${comparison} :position`, {
        boardId,
        status,
        position: fromPosition,
      })
      .execute();
  }

  private async validateBoardOwnership(boardId: number, userId: number): Promise<Board> {
    const board = await this.boardRepository.findOne({ where: { id: boardId } });
    
    if (!board) {
      throw new NotFoundException('Board not found');
    }
    
    if (board.userId !== userId) {
      throw new ForbiddenException('You do not have access to this board');
    }
    
    return board;
  }
}