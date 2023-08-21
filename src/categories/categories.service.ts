import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ICategory } from './interface/Category.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('categories') private CategoryModel: Model<ICategory>,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<ICategory> {
    const newCategory = await new this.CategoryModel(createCategoryDto);

    return newCategory.save();
  }

  async getAllCategories(): Promise<ICategory[]> {
    const CategoryData = await this.CategoryModel.find().select('-__v').populate("subCategories");
    if (!CategoryData || CategoryData.length == 0) {
      throw new NotFoundException('Categories data not found!');
    }
    return CategoryData;
  }

  async getCategory(CategoryId: string): Promise<ICategory> {
    const existingCategory = await this.CategoryModel.findById(
      CategoryId,
    ).exec();
    if (!existingCategory) {
      throw new NotFoundException(`Category ${CategoryId} does not exist!`);
    }
    return existingCategory;
  }

  async updateCategory(
    CategoryId: string,

    updateCategoryDto: UpdateCategoryDto,
  ): Promise<ICategory> {
    const existingCategory = await this.CategoryModel.findByIdAndUpdate(
      CategoryId,
      updateCategoryDto,
      { new: true },
    );
    if (!existingCategory) {
      throw new NotFoundException(`Category #${CategoryId} not found`);
    }
    return existingCategory;
  }

  async deleteCategory(CategoryId: string): Promise<ICategory> {
    const deletedCategory = await this.CategoryModel.findByIdAndDelete(
      CategoryId,
    );
    if (!deletedCategory) {
      throw new NotFoundException(`Category #${CategoryId} not found`);
    }
    return deletedCategory;
  }
}
