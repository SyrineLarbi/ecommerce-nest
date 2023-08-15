import { Controller, Get, Post, Body, Put, Param, Delete, UseInterceptors, Res, UploadedFile, HttpStatus } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { response } from 'express';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file',{
      storage: diskStorage({
        destination:'./uploads/Customers',
        filename: (request, file, callback)=> 
        callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  )
  async createCustomer(@Res() response, @Body() createCustomerDto: CreateCustomerDto, @UploadedFile() file: Express.Multer.File,) {
    try{
      createCustomerDto.photo = file.filename;
      const newCustomer = await this.customersService.createCustomer(createCustomerDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Customer has been created successfully',
        status: HttpStatus.CREATED,
        data: newCustomer,
      });
    } catch (err){
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: 'Error : User not created!' + err,
        data: null,
      });
    }
  }


  @Get()
  async findAllCustomers(@Res() response) {
    try{
      const CustomersData = await this.customersService.findAllCustomers();
      return response.status(HttpStatus.OK).json({
        message: 'All Users fetched successfully!!',
        status: HttpStatus.OK,
        data: CustomersData,
      });
    } catch (err){
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data:null,
      });
    }
  }

  @Get('/:id')
  async findCustomerByID(@Res() response, @Param('id') id: string) {
    try{
      const existingCustomer = await this.customersService.findCustomerById(id);
      return response.status(HttpStatus.OK).json({
        message:"customer found",
        data: existingCustomer,
        status: HttpStatus.OK,
      });
    } catch (err){
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
    }

  @Put('/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload/Users',
        filename: (request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  )
  async update(@Res() response, @Param('id') id: string, @Body() updateCustomerDto: UpdateCustomerDto,  @UploadedFile() file: Express.Multer.File,) {
    try{
      if (file ==  undefined || file == null){
        updateCustomerDto.photo = (await (this.customersService.findCustomerById(id))).photo;
        const existingCustomer= this.customersService.updateCustomer(id, updateCustomerDto);
    return response.status(HttpStatus.OK).json({
      message: 'User updated Successfully!',
      data: existingCustomer,
      status: HttpStatus.OK,
    });
      } else {
        updateCustomerDto.photo = file.filename;
        const existingUser = await this.customersService.updateCustomer(
          id,
          updateCustomerDto,
        );
        return response.status(HttpStatus.OK).json({
          message: 'User updated Successfully!',
          data: existingUser,
          status: HttpStatus.OK,
        });
      }
    }catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  };
  

  @Delete('/:id')
  async deleteUser(@Res() response, @Param('id') UserId: string) {
    try {
      const deletedUser = await this.customersService.removeCustomer(UserId);
      return response.status(HttpStatus.OK).json({
        message: 'Deleted successfully',
        status: HttpStatus.OK,
        data: deletedUser,
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
