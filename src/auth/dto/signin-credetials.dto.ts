import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class SigninCredetialsDto {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(20)
    password: string;

}