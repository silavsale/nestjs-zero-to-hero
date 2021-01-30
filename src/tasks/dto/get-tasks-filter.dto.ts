import { TaskStatus } from '../task.status.enum'

export class GetTaskFileredDto {
    status: TaskStatus;
    search: string;
}
