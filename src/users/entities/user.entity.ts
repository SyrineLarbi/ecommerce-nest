import { Prop,Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as argon2 from 'argon2';
import { Customer } from "src/customers/entities/customer.entity";


@Schema ({timestamps:true, discriminatorKey:'role'})
export class User {
    @Prop({required:true, enum:[Customer.name]})
    role: string;

    @Prop({required : true})
    name: string;

    @Prop({required:true, unique:true})
    username: string;

    @Prop({required:true})
    password: string;

    @Prop()
    photo: string;

    @Prop()
    refreshToken: string;

  
}
export const UserSchema = SchemaFactory.createForClass(User).pre("save", async function () {
this.password = await argon2.hash(this.password);   
})