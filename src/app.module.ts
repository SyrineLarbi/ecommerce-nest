import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from './categories/categories.module';
import { SubcategoriesModule } from './sub-categories/sub-categories.module';
import { ProductModule } from './product/product.module';
import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://0.0.0.0:27017/ecommerce'),
    CategoriesModule,
    SubcategoriesModule,
    ProductModule,
    UsersModule,
    CustomersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
