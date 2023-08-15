import { Document } from "mongoose";
import { IUser } from "src/users/interface/user.interface";
export interface ICustomer extends Document, IUser{
    readonly phone: string;
    readonly adress: string;
    role:string;
    readonly email: string;
}