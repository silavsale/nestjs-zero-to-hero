import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Param, 
  Patch, 
  Post, 
  Query,
  UsePipes, 
  ValidationPipe 
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFileredDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService){}

    @Get()
    getTasks(@Query() filteredDto: GetTaskFileredDto) : Task[] {
      if (Object.keys(filteredDto).length) {
        return this.taskService.getTasksWithFilters(filteredDto)
      } else {
        return this.taskService.getAllTasks()
      }
    }
    
    @Get('/:id')
    getTaskById(@Param('id') id: string) : Task {
      return this.taskService.getTaskById(id)
    }

    
    // Post method with DTO object
    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto) : Task{
      return this.taskService.createTask(createTaskDto)
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status', TaskStatusValidationPipe) status: TaskStatus 
    ) : Task {
      return this.taskService.updateTaskStatus(id, status)
    }
    
    @Delete('/:id')
    deleteTaskById(@Param('id') id: string) : void {
      this.taskService.deleteTaskById(id)
    }
    
    // Post without DTOs
    // @Post()
    // createTask(
        // @Body('title') title: string, 
        // @Body('description') description: string
    // ) : Task{
      // return this.taskService.createTask(title, description)
    // }
}