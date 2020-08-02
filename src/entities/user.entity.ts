import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
@Unique(['email'])
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50, name: 'first_name'})
    firstName: string;

    @Column({ type: 'varchar', length: 50, name: 'last_name'})
    lastName: string;

    @Column()
    email: string;

    @Column()
    salt: string;

    @Column()
    password: string;

    async validatePassword(password: string): Promise<boolean> {
        const   hash = await bcrypt.hash(password, this.salt);
        return  hash === this.password;
    }
}
