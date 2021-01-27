// Data Transfer Object(DTOs)

import { IsNotEmpty, isNotEmpty } from 'class-validator'
export class CreateTaskDto {
    @IsNotEmpty()
    description: string
    
    @IsNotEmpty()
    title: string
}

