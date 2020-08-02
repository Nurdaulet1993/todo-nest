import {TaskStatus} from "../task-status.enum";
import {IsIn, IsNotEmpty, IsOptional} from "class-validator";

export class GetTasksFilterDto {
    @IsOptional()
    @IsIn([
        TaskStatus.ACTIVE,
        TaskStatus.DONE
    ])
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;

}
