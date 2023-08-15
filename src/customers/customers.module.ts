import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/entities/user.entity';
import { CustomerSchema } from './entities/customer.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:"Users", schema:UserSchema}])],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
