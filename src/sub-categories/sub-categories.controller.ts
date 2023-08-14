import {Controller, HttpStatus, Get, Post, Body, Param, Delete, Res, Put } from '@nestjs/common';
import { SubCategoriesService } from './sub-categories.service'; 
import { CreatesubCategoryDto } from './dto/create-sub-category.dto'; 
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto'; 

@Controller('Subcategories')
export class SubCategoriesController {
  constructor(private readonly subcategoriesService: SubCategoriesService) {}

  @Post()
  async createSubCat(@Res() response,@Body() createsubCategoryDto: CreatesubCategoryDto,
  ) {
    try {
      const newsubCategory = await this.subcategoriesService.createsubCategory(createsubCategoryDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'subCategory has been created successfully',
        status: HttpStatus.CREATED,
        data: newsubCategory,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: 'Error : subCategory not created!' + err,
        data: null,
      });
    }
  }

  @Get()
  async getSubCategories(@Res() response) {
    try {
      const SubCategoriesData = await this.subcategoriesService.getAllSubCategories();
      return response.status(HttpStatus.OK).json({
        message: 'All Subcategories fetched successfully!!',
        status: HttpStatus.OK,
        data: SubCategoriesData,
      });
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }

  @Get('/:id')
  async getsubCategory(@Res() response, @Param('id') subCategoryId: string) {
    try {
      const existingsubCategory = await this.subcategoriesService.getsubCategory(subCategoryId);
      return response.status(HttpStatus.OK).json({
        message: 'subCategory found',
        data: existingsubCategory,
        status: HttpStatus.OK,
      });
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }

  @Put('/:id')
  async updateCat(
    @Res() response,
    @Param('id') subCategoryId: string,
    @Body() updatesubCategoryDto: UpdateSubCategoryDto,
  ) {
    try {
      const existingsubCategory = await this.subcategoriesService.updatesubCategory(subCategoryId,updatesubCategoryDto);
      return response.status(HttpStatus.OK).json({
        message: 'subCategory updated Successfully!',
        data: existingsubCategory,
        status: HttpStatus.OK,
      });
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }

  @Delete('/:id')
  async deletesubCategory(@Res() response, @Param('id') subCategoryId: string) {
    try {
      const deletedsubCategory= await this.subcategoriesService.deletesubCategory(subCategoryId);
      return response.status(HttpStatus.OK).json({
        message: 'Deleted successfully',
        status: HttpStatus.OK,
        data: deletedsubCategory,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }
}
