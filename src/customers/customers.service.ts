import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Model } from 'mongoose';
import { ICustomer } from './interface/customer.interface';
import { UsersService } from 'src/users/users.service';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from 'src/users/interface/user.interface';

@Injectable()
export class CustomersService {
  constructor( @InjectModel ('Users') private customerModel: Model<IUser>){}

  async createCustomer(createCustomerDto: CreateCustomerDto):Promise<IUser> {
    const newCustomer = await new this.customerModel(createCustomerDto);
    return newCustomer.save();
  }

  async findAllCustomers():Promise <IUser[]> {
    const CustomerData = await this.customerModel.find({role:"Customer"}).select('-__v');
    if (!CustomerData || CustomerData.length == 0){
      throw new NotFoundException('customer data found!');
    }
    return CustomerData;
  }

  async findCustomerById(id: string): Promise<IUser> {
    return this.customerModel.findById(id);
  }
  async getCutsomer(username: string): Promise<IUser> { const existingCustomer = await this.customerModel.findOne({username})
  if (!existingCustomer){
    throw new NotFoundException(`customer with  ${username} not found!`);
  }
  return existingCustomer;
  }

  async updateCustomer(CustomerId: string, updateCustomerDto: UpdateCustomerDto): Promise<IUser> {
    const existingCustomer = await this.customerModel.findByIdAndUpdate(CustomerId,updateCustomerDto,{ new: true },);
    if (!existingCustomer){
      throw new NotFoundException(`Customer #${CustomerId} not found`);
    }
    return existingCustomer;
  }

  async removeCustomer(id: string):Promise <IUser> {
    const deleteCustomer =  await this.customerModel.findByIdAndDelete(id);
    if (!deleteCustomer){
      throw new NotFoundException (`Customer #${id} not found`) ;
    }
    return deleteCustomer;
  }
}
