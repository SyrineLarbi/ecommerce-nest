import { IsString } from "class-validator";

export class CreatelogInDto{
   @IsString()
    readonly username: string;
    readonly password: string;
}