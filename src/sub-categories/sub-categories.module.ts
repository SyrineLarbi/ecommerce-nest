import { Module } from '@nestjs/common';
import { SubCategoriesService } from './sub-categories.service';
import { SubCategoriesController } from './sub-categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SubCategorySchema } from './entities/sub-category.entity';
import { CategorySchema } from 'src/categories/entities/category.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{name:'subcategories',schema : SubCategorySchema}, {name:'categories',schema:CategorySchema}])
  ],
  controllers: [SubCategoriesController],
  providers: [SubCategoriesService],
})
export class SubcategoriesModule {}
