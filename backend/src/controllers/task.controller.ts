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
import { TaskService } from '../services/task.service';
import { CreateTaskDto, UpdateTaskDto, UpdateTaskPositionDto } from '../dto/task.dto';

@ApiTags('tasks')
@Controller('boards/:boardId/tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'Task successfully created' })
  async create(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Body(ValidationPipe) createTaskDto: CreateTaskDto,
    @Request() req: any,
  ) {
    const userId = req.user?.id || 1;
    return this.taskService.create(createTaskDto, boardId, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks for a board' })
  @ApiResponse({ status: 200, description: 'List of board tasks' })
  async findAll(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Request() req: any,
  ) {
    const userId = req.user?.id || 1;
    return this.taskService.findAllByBoard(boardId, userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific task' })
  @ApiResponse({ status: 200, description: 'Task details' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any,
  ) {
    const userId = req.user?.id || 1;
    return this.taskService.findOne(id, userId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiResponse({ status: 200, description: 'Task successfully updated' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateTaskDto: UpdateTaskDto,
    @Request() req: any,
  ) {
    const userId = req.user?.id || 1;
    return this.taskService.update(id, updateTaskDto, userId);
  }

  @Patch(':id/position')
  @ApiOperation({ summary: 'Update task position and status' })
  @ApiResponse({ status: 200, description: 'Task position successfully updated' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  async updatePosition(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updatePositionDto: UpdateTaskPositionDto,
    @Request() req: any,
  ) {
    const userId = req.user?.id || 1;
    return this.taskService.updatePosition(id, updatePositionDto, userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({ status: 200, description: 'Task successfully deleted' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any,
  ) {
    const userId = req.user?.id || 1;
    await this.taskService.remove(id, userId);
    return { message: 'Task successfully deleted' };
  }
}