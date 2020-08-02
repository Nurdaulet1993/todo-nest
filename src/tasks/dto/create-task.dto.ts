import { IsString, IsNotEmpty, IsByteLength } from "class-validator";

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    @IsByteLength(3,100)
    body: string;
}
