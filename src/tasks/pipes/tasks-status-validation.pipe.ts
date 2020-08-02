// @ts-ignore
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import {TaskStatus} from "../task-status.enum";

@Injectable()
export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedValues = [
        TaskStatus.ACTIVE,
        TaskStatus.DONE
    ];

    transform(value: any, metadata: ArgumentMetadata): any {
        value = value.toUpperCase();

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} is an invalid status`)
        }
        return value;
    }

    private isStatusValid(value: any) {
        const idx = this.allowedValues.indexOf(value);
        return idx !== -1;
    }
}
