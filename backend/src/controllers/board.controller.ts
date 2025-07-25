import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  ParseIntPipe,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BoardService } from '../services/board.service';
import { CreateBoardDto, UpdateBoardDto } from '../dto/board.dto';

@ApiTags('boards')
@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new board' })
  @ApiResponse({ status: 201, description: 'Board successfully created' })
  async create(
    @Body(ValidationPipe) createBoardDto: CreateBoardDto,
    @Request() req: any,
  ) {
    // For now, we'll use a hardcoded user ID. In a real app, this would come from JWT token
    const userId = req.user?.id || 1;
    return this.boardService.create(createBoardDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all boards for the current user' })
  @ApiResponse({ status: 200, description: 'List of user boards' })
  async findAll(@Request() req: any) {
    const userId = req.user?.id || 1;
    return this.boardService.findAllByUser(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific board' })
  @ApiResponse({ status: 200, description: 'Board details' })
  @ApiResponse({ status: 404, description: 'Board not found' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any,
  ) {
    const userId = req.user?.id || 1;
    return this.boardService.findOne(id, userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a board' })
  @ApiResponse({ status: 200, description: 'Board successfully updated' })
  @ApiResponse({ status: 404, description: 'Board not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateBoardDto: UpdateBoardDto,
    @Request() req: any,
  ) {
    const userId = req.user?.id || 1;
    return this.boardService.update(id, updateBoardDto, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a board' })
  @ApiResponse({ status: 200, description: 'Board successfully deleted' })
  @ApiResponse({ status: 404, description: 'Board not found' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any,
  ) {
    const userId = req.user?.id || 1;
    await this.boardService.remove(id, userId);
    return { message: 'Board successfully deleted' };
  }
}