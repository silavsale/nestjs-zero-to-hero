import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService){}

    @Get()
    getAllTasks() : Task[] {
      return this.taskService.getAllTasks()
    }

    // @Post()
    // createTask(@Body('title') title: string, @Body('description') description: string) : Task{
    //      return this.taskService.createTask(title, description)
    // }
  
    // Porst wethod with DTO object
    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto) : Task{
         return this.taskService.createTask(createTaskDto)
    }
}
 