import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

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
        example: "Status(doing/done)"
    })
    @IsString()
    @IsOptional()
    status: string

    @ApiProperty({
        example: "2024-02-16T16:40:50.212Z"
    })
    @IsString()
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