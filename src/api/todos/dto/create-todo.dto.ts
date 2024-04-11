import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsDateString, IsEnum } from "class-validator";

enum TodoStatus {
    TODO = 'todo',
    DOING = 'doing',
    DONE = 'done'
}

export class CreateTodoDto {
    @ApiProperty({
        example: "My todo title"
    })
    @IsString()
    @IsNotEmpty()
    title: string

    @ApiProperty({
        example: "My todo description"
    })
    @IsString()
    @IsOptional()
    description: string

    @ApiProperty({
        example: "todo"
    })
    @IsEnum(TodoStatus)
    @IsNotEmpty()
    status: TodoStatus

    @ApiProperty({
        example: "2024-02-16T16:40:50.212Z"
    })
    @IsDateString()
    @IsNotEmpty()
    estimate: Date
}


export class UpdateStatusDto {
    @ApiProperty({
        example: "doing"
    })
    @IsString()
    @IsNotEmpty()
    status: string
}