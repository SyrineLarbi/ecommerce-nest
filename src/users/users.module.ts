import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/user.entity';
import { Customer, CustomerSchema } from 'src/customers/entities/customer.entity';


@Module({
  imports:[
    MongooseModule.forFeature([{name:'Users',schema:UserSchema, discriminators:[
      {name: Customer.name, schema: CustomerSchema}
    ]}])],
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
