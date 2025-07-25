import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from '../entities/board.entity';
import { CreateBoardDto, UpdateBoardDto } from '../dto/board.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  async create(createBoardDto: CreateBoardDto, userId: number): Promise<Board> {
    const board = this.boardRepository.create({
      ...createBoardDto,
      userId,
    });

    return this.boardRepository.save(board);
  }

  async findAllByUser(userId: number): Promise<Board[]> {
    return this.boardRepository.find({
      where: { userId },
      relations: ['tasks'],
      order: { lastAccessed: 'DESC' },
    });
  }

  async findOne(id: number, userId: number): Promise<Board> {
    const board = await this.boardRepository.findOne({
      where: { id, userId },
      relations: ['tasks'],
    });

    if (!board) {
      throw new NotFoundException('Board not found');
    }

    // Update last accessed time
    await this.boardRepository.update(id, { lastAccessed: new Date() });

    return board;
  }

  async update(id: number, updateBoardDto: UpdateBoardDto, userId: number): Promise<Board> {
    const board = await this.findOne(id, userId);
    
    Object.assign(board, updateBoardDto);
    return this.boardRepository.save(board);
  }

  async remove(id: number, userId: number): Promise<void> {
    const board = await this.findOne(id, userId);
    await this.boardRepository.remove(board);
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