import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatesubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { ISubCategory } from './interface/subCategory.interface';
import { ICategory } from 'src/categories/interface/Category.interface';

@Injectable()
export class SubCategoriesService {
  constructor(
    @InjectModel('subcategories') private subCategoryModel: Model<ISubCategory>, @InjectModel('categories') private CategoryModel:Model<ICategory>
  ) {}

  async createsubCategory(
    createsubCategoryDto: CreatesubCategoryDto): Promise<ISubCategory> {
    const newsubCategory = await new this.subCategoryModel(createsubCategoryDto);
    await this.CategoryModel.findByIdAndUpdate(createsubCategoryDto.category,{$push:{subCategories:newsubCategory }})

    return newsubCategory.save();
  }

  async getAllSubCategories(): Promise<ISubCategory[]> {
    const subCategoryData = await this.subCategoryModel.find().populate("category").select('-__v');
    if (!subCategoryData || subCategoryData.length == 0) {
      throw new NotFoundException('SubCategories data not found!');
    }
    return subCategoryData;
  }

  async getsubCategory(subCategoryId: string): Promise<ISubCategory> {
    const existingsubCategory = await this.subCategoryModel.findById(
      subCategoryId,
    ).exec();
    if (!existingsubCategory) {
      throw new NotFoundException(`subCategory ${subCategoryId} does not exist!`);
    }
    return existingsubCategory;
  }

  async updatesubCategory(
    subCategoryId: string,

    updatesubCategoryDto: UpdateSubCategoryDto,
  ): Promise<ISubCategory> {
    const existingsubCategory = await this.subCategoryModel.findByIdAndUpdate(
      subCategoryId,
      updatesubCategoryDto,
      { new: true },
    );
    if (!existingsubCategory) {
      throw new NotFoundException(`subCategory #${subCategoryId} not found`);
    }
    return existingsubCategory;
  }

  async deletesubCategory(subCategoryId: string): Promise<ISubCategory> {
    const deletedsubCategory = await this.subCategoryModel.findByIdAndDelete(subCategoryId);
    await this.CategoryModel.findByIdAndUpdate(deletedsubCategory.category,{$pull:{subCategories:deletedsubCategory._id}})
    if (!deletedsubCategory) {
      throw new NotFoundException(`subCategory #${subCategoryId} not found`);
    }
    return deletedsubCategory;
  }
}
