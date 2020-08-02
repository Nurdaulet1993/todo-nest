import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from "./user.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthCredentialsDto } from "./dto/auth-credetials.dto";
import { SigninCredetialsDto } from "./dto/signin-credetials.dto";
import { JwtService } from "@nestjs/jwt";

export interface SignInResponse {
    userId: number;
    name: string;
    email: string;
    token: string;
    tokenExpiration: number
}

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository,
                private jwtService: JwtService) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.signUp(authCredentialsDto);
    }

    async signIn(signinCredetialsDto: SigninCredetialsDto): Promise<SignInResponse> {
        const user = await this.userRepository.validatePassword(signinCredetialsDto);
        if (!user) {
            throw new UnauthorizedException('Invalid email or password!');
        }
        const { firstName, lastName, email, id } = user;
        const payload = { firstName, lastName, email };
        const accessToken = await this.jwtService.sign(payload);

        return {
            userId: id,
            name: firstName,
            email: email,
            token: accessToken,
            tokenExpiration: 3600
        }
    }
}
