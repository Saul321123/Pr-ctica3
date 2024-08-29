import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TasksService, Task } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(): Task[] {
    return this.tasksService.findAll();
  }

  @Post()
  create(@Body() task: Omit<Task, 'id'>): Task {
    return this.tasksService.create(task);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedTask: Partial<Omit<Task, 'id'>>
  ): Task {
    return this.tasksService.update(id, updatedTask);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): void {
    this.tasksService.remove(id);
  }
}


