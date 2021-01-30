import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFileredDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';
import { TaskStatus } from './task.status.enum';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) {}

    // getAllTasks() : Task[] {
    //     console.log('getAllTasks');
        
    //     return this.tasks
    // }

    // getTasksWithFilters(filteredDto: GetTaskFileredDto) : Task[] {
    //     const { status, search } = filteredDto

    //     let tasks = this.getAllTasks()

    //     if (status) {
    //         tasks = this.tasks.filter(task => task.status === status)
    //     }
    //     if (search) {
    //         tasks = this.tasks.filter(task => 
    //             task.title.includes(search) ||
    //             task.description.includes(search)   
    //         )
    //     }

    //     return tasks
    // }

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id)

        if (!found) {
            throw new NotFoundException(`Task with ID ${id} not found` )
        }

        return found
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto)
    }

    // deleteTaskById(id: string) : void{
    //     console.log('deleteTaskById');
    //     const found = this.getTaskById(id)
    //     this.tasks = this.tasks.filter(task => task.id !== found.id)
        
    // }
    
    // updateTaskStatus(id: string, status: TaskStatus) : Task {
    //     console.log({status});
        
    //     const task = this.getTaskById(id)
    //     task.status = status
    //     return task
    // }
}
