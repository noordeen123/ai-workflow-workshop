import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { CreateTaskDto, UpdateTaskDto } from '../dto/task.dto';
import { AuthGuard } from '../guards/auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('boards/:boardId/tasks')
@UseGuards(AuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'Task successfully created' })
  async create(
    @Param('boardId') boardId: string,
    @Body() createTaskDto: CreateTaskDto,
    @Req() req: any,
  ) {
    return this.taskService.create(+boardId, createTaskDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks for a board' })
  @ApiResponse({ status: 200, description: 'List of tasks' })
  async findAll(@Param('boardId') boardId: string, @Req() req: any) {
    return this.taskService.findAllByBoard(+boardId, req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific task' })
  @ApiResponse({ status: 200, description: 'Task details' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  async findOne(@Param('id') id: string, @Req() req: any) {
    return this.taskService.findOne(+id, req.user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiResponse({ status: 200, description: 'Task successfully updated' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @Req() req: any,
  ) {
    return this.taskService.update(+id, updateTaskDto, req.user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({ status: 200, description: 'Task successfully deleted' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  async remove(@Param('id') id: string, @Req() req: any) {
    await this.taskService.remove(+id, req.user.id);
    return { message: 'Task deleted successfully' };
  }

  @Post('reorder')
  @ApiOperation({ summary: 'Reorder tasks (for drag and drop)' })
  @ApiResponse({ status: 200, description: 'Tasks successfully reordered' })
  async reorder(
    @Param('boardId') boardId: string,
    @Body() updates: { id: number; status: string; position: number }[],
    @Req() req: any,
  ) {
    await this.taskService.updatePositions(+boardId, updates, req.user.id);
    return { message: 'Tasks reordered successfully' };
  }
}