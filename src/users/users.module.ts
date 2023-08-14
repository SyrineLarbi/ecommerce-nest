import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/user.entity';


@Module({
  imports:[
    MongooseModule.forFeature([{name:'Users',schema:UserSchema}])],
  controllers: [UserController],
  providers: [UsersService],
})
export class UsersModule {}
