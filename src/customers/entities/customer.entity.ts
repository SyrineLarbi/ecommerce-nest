import { User } from "src/users/entities/user.entity";
import { Prop,Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Customer{
    role:string;
    @Prop({required:true})
    phone: string;
    @Prop({required:true})
    adress:string;
    @Prop({required:true})
    email:string;
}
export const CustomerSchema = SchemaFactory.createForClass(Customer);