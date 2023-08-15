import {
  Controller,
  HttpStatus,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  Put,
  UploadedFile,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('users')
export class UserController {
  constructor(private readonly UserService: UsersService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload/Users',
        filename: (request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  )
  async createUser(
    @Res() response,
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      createUserDto.photo = file.filename;
      const newUser = await this.UserService.createUser(createUserDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'User has been created successfully',
        status: HttpStatus.CREATED,
        data: newUser,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        status: 400,
        message: 'Error : User not created!' + err,
        data: null,
      });
    }
  }

  @Get('/getuserbyusername')
  async findbyuserName(@Res() response, @Query('username') username: string) {
    try {
      const existingUser = await this.UserService.getUser(username);
      return response.status(HttpStatus.OK).json({
        message: 'User found',
        data: existingUser,
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
  @Get()
  async getuser(@Res() response) {
    try {
      const UsersData = await this.UserService.getAllUsers();
      return response.status(HttpStatus.OK).json({
        message: 'All Users fetched successfully!!',
        status: HttpStatus.OK,
        data: UsersData,
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
  async getprod(@Res() response, @Param('id') UserId: string) {
    try {
      const existingUser = await this.UserService.getUser(UserId);
      return response.status(HttpStatus.OK).json({
        message: 'User found',
        data: existingUser,
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
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload/Users',
        filename: (request, file, callback) =>
          callback(null, `${new Date().getTime()}-${file.originalname}`),
      }),
    }),
  )
  async updateprod(
    @Res() response,
    @Param('id') UserId: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      if (file == undefined || file == null) {
        updateUserDto.photo = (await (this.UserService.findById(UserId))).photo;

        const existingUser = await this.UserService.updateUser(
          UserId,
          updateUserDto,
        );
        return response.status(HttpStatus.OK).json({
          message: 'User updated Successfully!',
          data: existingUser,
          status: HttpStatus.OK,
        });
      } else {
        updateUserDto.photo = file.filename;
        const existingUser = await this.UserService.updateUser(
          UserId,
          updateUserDto,
        );
        return response.status(HttpStatus.OK).json({
          message: 'User updated Successfully!',
          data: existingUser,
          status: HttpStatus.OK,
        });
      }
    } catch (err) {
      return response.status(err.status).json({
        message: err.response,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }

  @Delete('/:id')
  async deleteUser(@Res() response, @Param('id') UserId: string) {
    try {
      const deletedUser = await this.UserService.deleteUser(UserId);
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
