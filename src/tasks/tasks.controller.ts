import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Param, 
  ParseIntPipe, 
  Patch, 
  Post, 
  Query,
  UsePipes, 
  ValidationPipe 
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFileredDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService){}

    // @Get()
    // getTasks(@Query() filteredDto: GetTaskFileredDto) : Task[] {
    //   if (Object.keys(filteredDto).length) {
    //     return this.taskService.getTasksWithFilters(filteredDto)
    //   } else {
    //     return this.taskService.getAllTasks()
    //   }
    // }
    
    @Get('/:id')
    getTaskById(@Param('id', ParseIntPipe) id: number) : Promise<Task> {
      return this.taskService.getTaskById(id)
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto) : Promise<Task> {
      return this.taskService.createTask(createTaskDto)
    }

    // @Patch('/:id/status')
    // updateTaskStatus(
    //     @Param('id') id: string,
    //     @Body('status', TaskStatusValidationPipe) status: TaskStatus 
    // ) : Task {
    //   return this.taskService.updateTaskStatus(id, status)
    // }
    
    @Delete('/:id')
    deleteTaskById(@Param('id', ParseIntPipe) id: number): Promise<void> {
      return this.taskService.deleteTask(id)
    }
}