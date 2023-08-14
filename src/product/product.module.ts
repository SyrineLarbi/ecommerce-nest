import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './entities/product.entity';
import { SubCategorySchema } from 'src/sub-categories/entities/sub-category.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{name:'Products',schema : ProductSchema}, {name:'subcategories',schema:SubCategorySchema}])
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
