import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post, Query, UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { TasksService } from "./tasks.service";
import { Task } from "../entities/task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatusValidationPipe } from "./pipes/tasks-status-validation.pipe";
import { TaskStatus } from "./task-status.enum";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller('api/tasks')
// @UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.tasksService.getTasks(filterDto);
    }

    @Get(':id')
    getCustomerById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto ): Promise<Task> {
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete(':id')
    deleteTask(@Param('id', ParseIntPipe) id: number): Promise<number>{
        return this.tasksService.deleteTask(id);
    }

    @Patch(':id/update')
    updateTask(@Param('id', ParseIntPipe) id: number,
                     @Body('status', TaskStatusValidationPipe) status: TaskStatus,
                     @Body('body') body: string): Promise<Task>{
        return this.tasksService.updateTask(id, status, body);
    }
}
