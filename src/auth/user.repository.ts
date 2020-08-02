import { Repository, EntityRepository } from "typeorm";
import { User } from "../entities/user.entity";
import { AuthCredentialsDto } from "./dto/auth-credetials.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import {SigninCredetialsDto} from "./dto/signin-credetials.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { firstName, lastName, email, password } = authCredentialsDto;
        const user = new User();
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        try {
            await user.save();
        } catch (err) {
            console.log(err.code);
            if (err.code === 'ER_DUP_ENTRY' || err.code ==='23505') { //Duplicate email
                throw new ConflictException(`User with email: ${email} already exist!`);
            } else { //Other errors
                throw new InternalServerErrorException()
            }
        }
    }

    async validatePassword(signinCredetialsDto: SigninCredetialsDto): Promise<User> {
        const { email, password } = signinCredetialsDto;
        const user = await this.findOne({ email });

        if (user && await user.validatePassword(password)) {
            return user;
        } else  {
            return null;
        }

    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}
