import { Document } from 'mongoose';
export interface IProduct extends Document{
  readonly name: string;
  readonly description: string;
  readonly price: string;
  readonly qte: number;
  images: string[];
  readonly subcategory: string;
}