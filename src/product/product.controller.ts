import {Controller, HttpStatus, Get, Post, Body, Param, Delete, Res, Put,UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';


@Controller('Products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor("files",10,{
      storage: diskStorage({
        destination:"./upload/products",
        filename: (request,file, callback)=>
        callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  )
  async createProd(@Res() response,@Body() createproductDto: CreateProductDto,@UploadedFiles() files) {
    try {
      createproductDto.images=files.map(item=>item.filename);
      const newproduct = await this.productService.createProduct(createproductDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'product has been created successfully',
        status: HttpStatus.CREATED,
        data: newproduct,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: 'Error : product not created!' + err,
        data: null,
      });
    }
  }

  @Get()
  async getprods(@Res() response) {
    try {
      const productsData = await this.productService.getAllProducts();
      return response.status(HttpStatus.OK).json({
        message: 'All products fetched successfully!!',
        status: HttpStatus.OK,
        data: productsData,
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
  async getprod(@Res() response, @Param('id') productId: string) {
    try {
      const existingproduct = await this.productService.getproduct(productId);
      return response.status(HttpStatus.OK).json({
        message: 'product found',
        data: existingproduct,
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
  async updateprod(
    @Res() response,
    @Param('id') productId: string,
    @Body() updateproductDto: UpdateProductDto,
  ) {
    try {
      const existingproduct = await this.productService.updateproduct(productId,updateproductDto);
      return response.status(HttpStatus.OK).json({
        message: 'product updated Successfully!',
        data: existingproduct,
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
  async deleteproduct(@Res() response, @Param('id') productId: string) {
    try {
      const deletedproduct= await this.productService.deletesubCategory(productId);
      return response.status(HttpStatus.OK).json({
        message: 'Deleted successfully',
        status: HttpStatus.OK,
        data: deletedproduct,
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

