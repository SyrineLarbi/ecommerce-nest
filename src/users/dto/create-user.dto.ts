import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    readonly name: string;
    
    readonly password: string;

    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @IsString()
    photo: string;
    refreshToken: string;
}
