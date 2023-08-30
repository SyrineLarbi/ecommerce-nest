import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './interface/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private UserModel: Model<IUser>,
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<IUser> {
    const newUser = await new this.UserModel(createUserDto);

    return newUser.save();
  }

  async getAllUsers(): Promise<IUser[]> {
    const UserData = await this.UserModel.find().select('-__v');
    if (!UserData || UserData.length == 0) {
      throw new NotFoundException('Users data not found!');
    }
    return UserData;
  }
  async findById(id:string):Promise<IUser>{
    return this.UserModel.findById(id)
  }

  async getUser(username: string): Promise<IUser> {
    const existingUser = await this.UserModel.findOne({username})
  
    return existingUser;
  }

  async updateUser(
    UserId: string,

    updateUserDto: UpdateUserDto,
  ): Promise<IUser> {
    const existingUser = await this.UserModel.findByIdAndUpdate(
      UserId,
      updateUserDto,
      { new: true },
    );
    if (!existingUser) {
      throw new NotFoundException(`User #${UserId} not found`);
    }
    return existingUser;
  }

  async deleteUser(UserId: string): Promise<IUser> {
    const deletedUser = await this.UserModel.findByIdAndDelete(
      UserId,
    );
    if (!deletedUser) {
      throw new NotFoundException(`User #${UserId} not found`);
    }
    return deletedUser;
  }
}
