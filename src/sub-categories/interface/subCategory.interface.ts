import { Document } from 'mongoose';
export interface ISubCategory extends Document{
  readonly name: string;
  readonly description: string;
  readonly category:string;
}