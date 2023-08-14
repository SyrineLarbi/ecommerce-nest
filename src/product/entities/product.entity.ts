import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Product extends Document {
 @Prop({ required: true, unique: true})
 name:string;
 @Prop({ required: true})
 description: string;
 @Prop({required:true})
 qte: number;
 @Prop({required:true})
 price:string;
 @Prop({required: true})
 images: string[];
 @Prop({type:SchemaTypes.ObjectId,ref:"subcategories"})
 subcategory!:Types.ObjectId
}
export const ProductSchema = SchemaFactory.createForClass(Product);
