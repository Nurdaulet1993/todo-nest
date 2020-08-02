import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthCredentialsDto } from "./dto/auth-credetials.dto";
import { AuthService } from "./auth.service";
import { SigninCredetialsDto } from "./dto/signin-credetials.dto";
import { SignInResponse } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "../shared/decorators/get-user.decorator";
import {User} from "../entities/user.entity";

@Controller('api/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signup')
    signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialsDto): Promise<void> {
        return this.authService.signUp(authCredentialDto);
    }

    @Post('signin')
    signIn(@Body(ValidationPipe) signinCredetialsDto: SigninCredetialsDto): Promise<SignInResponse> {
        return this.authService.signIn(signinCredetialsDto);
    }

    @Post()
    @UseGuards(AuthGuard())
    test(@GetUser() user: User) {
        console.log(user);
    }
}
