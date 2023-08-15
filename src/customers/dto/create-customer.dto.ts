import { IsString } from "class-validator";
import { CreateUserDto } from "src/users/dto/create-user.dto";

export class CreateCustomerDto extends CreateUserDto {
    @IsString()
    readonly phone: string;
    readonly adress: string;
    role:string;
    readonly email:string;

}
