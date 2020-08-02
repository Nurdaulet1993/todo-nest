import { EntityRepository, Repository } from "typeorm";
import { Task } from "../entities/task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('tasks');
        if ( status ) {
            query.andWhere('tasks.status = :status', { status })
        }
        if ( search ) {
            query.andWhere('tasks.body LIKE :search', { search: `%${search}%` });
        }

        return await query.getMany();
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const { body } = createTaskDto;
        const   task = new Task();
        task.body = body;
        task.status = TaskStatus.ACTIVE;
        await   task.save();
        return  task;
    }
}
