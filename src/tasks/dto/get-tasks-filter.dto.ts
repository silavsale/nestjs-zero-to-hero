import { TaskStatus } from '../task.model'

export class GetTaskFileredDto {
    status: TaskStatus;
    search: string;
}
