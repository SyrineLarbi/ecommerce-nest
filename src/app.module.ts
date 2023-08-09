import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://0.0.0.0:27017/ecommerce'), CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
