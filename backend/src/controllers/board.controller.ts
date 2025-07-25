import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { BoardService } from '../services/board.service';
import { CreateBoardDto, UpdateBoardDto } from '../dto/board.dto';
import { AuthGuard } from '../guards/auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Boards')
@Controller('boards')
@UseGuards(AuthGuard)
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new board' })
  @ApiResponse({ status: 201, description: 'Board successfully created' })
  async create(@Body() createBoardDto: CreateBoardDto, @Req() req: any) {
    return this.boardService.create(createBoardDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all boards for the current user' })
  @ApiResponse({ status: 200, description: 'List of user boards' })
  async findAll(@Req() req: any) {
    return this.boardService.findAllByUser(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific board' })
  @ApiResponse({ status: 200, description: 'Board details' })
  @ApiResponse({ status: 404, description: 'Board not found' })
  async findOne(@Param('id') id: string, @Req() req: any) {
    return this.boardService.findOne(+id, req.user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a board' })
  @ApiResponse({ status: 200, description: 'Board successfully updated' })
  @ApiResponse({ status: 404, description: 'Board not found' })
  async update(
    @Param('id') id: string,
    @Body() updateBoardDto: UpdateBoardDto,
    @Req() req: any,
  ) {
    return this.boardService.update(+id, updateBoardDto, req.user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a board' })
  @ApiResponse({ status: 200, description: 'Board successfully deleted' })
  @ApiResponse({ status: 404, description: 'Board not found' })
  async remove(@Param('id') id: string, @Req() req: any) {
    await this.boardService.remove(+id, req.user.id);
    return { message: 'Board deleted successfully' };
  }
}