import { Document } from "mongoose";
export interface IUser extends Document{
    readonly name: string;
    readonly password:string;
    readonly username:string;
    readonly refreshToken: string;
    photo: string
}