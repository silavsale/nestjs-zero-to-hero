import { TaskStatus } from './task.status.enum';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';
import { GetTasksFilerDto } from './dto/get-tasks-filter.dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
    async getTasks(filterDto: GetTasksFilerDto): Promise<Task[]> {
        const { status, search } = filterDto
        const query = this.createQueryBuilder('task')

        if (status) {
            query.andWhere('task.status = :status', { status })
            
        }

        if (search) {
            // query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%`})
            query.andWhere(
                'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
                { search: `%${search}%` },
            )
        }

        const tasks = await query.getMany()
        return tasks
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { title, description} = createTaskDto

        const task = new Task()
        task.title = title
        task.description = description
        task.status = TaskStatus.OPEN
        await task.save()

        return task
    }
}