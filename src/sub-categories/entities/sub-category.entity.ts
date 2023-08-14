import { Document, SchemaTypes, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({ timestamps: true })
export class SubCategory extends Document {
  @Prop({ required: true, unique: true })
  name: string;
  @Prop ({ required: true})
  description: string;
  @Prop({ type: SchemaTypes.ObjectId, ref: 'categories', required: true })
  category: Types.ObjectId;
  @Prop([{type: SchemaTypes.ObjectId, ref: 'Products'}])
  products:Types.ObjectId[];
}
//id de category
export const SubCategorySchema = SchemaFactory.createForClass(SubCategory);
