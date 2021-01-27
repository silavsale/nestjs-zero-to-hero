import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid'
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFileredDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = []

    getAllTasks() : Task[] {
        console.log('getAllTasks');
        
        return this.tasks
    }

    getTasksWithFilters(filteredDto: GetTaskFileredDto) : Task[] {
        const { status, search } = filteredDto

        let tasks = this.getAllTasks()

        if (status) {
            tasks = this.tasks.filter(task => task.status === status)
        }
        if (search) {
            tasks = this.tasks.filter(task => 
                task.title.includes(search) ||
                task.description.includes(search)   
            )
        }

        return tasks
    }

    getTaskById(id: string) : Task {
        const found = this.tasks.find(task => task.id === id)

        if (!found) {
            throw new NotFoundException(`Task with ID ${id} not found` )
        }

        return found
    }

    createTask(createTaskDto: CreateTaskDto) : Task {
        const {title, description} = createTaskDto
        const task: Task = {
            id: uuidv4(),
            title,
            description,
            status: TaskStatus.OPEN
        }

        console.log(task.id);
        
        this.tasks.push(task)
        return task
    }

    deleteTaskById(id: string) : void{
        console.log('deleteTaskById');
        const found = this.getTaskById(id)
        this.tasks = this.tasks.filter(task => task.id !== found.id)
        
    }
    
    updateTaskStatus(id: string, status: TaskStatus) : Task {
        console.log({status});
        
        const task = this.getTaskById(id)
        task.status = status
        return task
    }
}
