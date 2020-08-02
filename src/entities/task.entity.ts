import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
import { TaskStatus } from "../tasks/task-status.enum";

@Entity({name: 'tasks'})
export class Task extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    body: string;

    @Column()
    status: TaskStatus;
}
