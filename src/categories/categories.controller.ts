import { Controller, HttpStatus, Get, Post, Body, Param, Delete, Res, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async createCat(
    @Res() response,
    @Body() createCategoryDto: CreateCategoryDto,
  ) {
    try {
      const newCategory = await this.categoriesService.createCategory(createCategoryDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Category has been created successfully',
        status: HttpStatus.CREATED,
        data: newCategory,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
      status: 400,
      message: 'Error : Category not created!' + err,
      data:null,
    });
  }
}

  @Get()
  async getCategories(@Res() response) {
    try{
      const CategoriesData = await this.categoriesService.getAllCategories();
      return response.status(HttpStatus.OK).json({
        message:'All categories fetched successfully!!',
        status: HttpStatus.OK,
        data: CategoriesData,
      });
    } catch (err){
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    } 
  }

  @Get('/:id')
  async getCategory(@Res() response, @Param('id') CategoryId: string) {
    try {
      const existingCategory = await this.categoriesService.getCategory(
        CategoryId,
      );
      return response.status(HttpStatus.OK).json({
        message: 'category found',
        data: existingCategory,
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
    @Param('id') CategoryId: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      const existingCategory = await this.categoriesService.updateCategory(
        CategoryId,
        updateCategoryDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Category updated Successfully!',
        data: existingCategory,
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
  async deleteCategory(@Res() response, @Param('id') CategoryId: string) {
    try {
      const deletedCategory = await this.categoriesService.deleteCategory(
        CategoryId,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Deleted successfully',
        status: HttpStatus.OK,
        data: deletedCategory,
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
