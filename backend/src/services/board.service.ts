import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from '../entities/board.entity';
import { CreateBoardDto, UpdateBoardDto, BoardResponseDto } from '../dto/board.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  async create(createBoardDto: CreateBoardDto, userId: number): Promise<BoardResponseDto> {
    const board = this.boardRepository.create({
      ...createBoardDto,
      userId,
    });

    const savedBoard = await this.boardRepository.save(board);
    return this.formatBoardResponse(savedBoard);
  }

  async findAllByUser(userId: number): Promise<BoardResponseDto[]> {
    const boards = await this.boardRepository.find({
      where: { userId },
      relations: ['tasks'],
      order: { lastAccessed: 'DESC' },
    });

    return boards.map(board => ({
      ...this.formatBoardResponse(board),
      taskCount: board.tasks?.length || 0,
    }));
  }

  async findOne(id: number, userId: number): Promise<BoardResponseDto> {
    const board = await this.boardRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });

    if (!board) {
      throw new NotFoundException('Board not found');
    }

    if (board.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    // Update last accessed time
    await this.boardRepository.update(id, { lastAccessed: new Date() });

    return {
      ...this.formatBoardResponse(board),
      taskCount: board.tasks?.length || 0,
    };
  }

  async update(id: number, updateBoardDto: UpdateBoardDto, userId: number): Promise<BoardResponseDto> {
    const board = await this.findOne(id, userId);
    
    await this.boardRepository.update(id, updateBoardDto);
    const updatedBoard = await this.boardRepository.findOne({ where: { id } });
    
    return this.formatBoardResponse(updatedBoard!);
  }

  async remove(id: number, userId: number): Promise<void> {
    const board = await this.findOne(id, userId);
    await this.boardRepository.delete(id);
  }

  private formatBoardResponse(board: Board): BoardResponseDto {
    return {
      id: board.id,
      name: board.name,
      description: board.description,
      userId: board.userId,
      createdAt: board.createdAt,
      updatedAt: board.updatedAt,
      lastAccessed: board.lastAccessed,
    };
  }
}