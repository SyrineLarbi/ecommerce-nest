import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IProduct } from './interface/product.interface';
import { ISubCategory } from 'src/sub-categories/interface/subCategory.interface';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Products') private productModel: Model<IProduct>, @InjectModel('subcategories') private SubCategoryModel:Model<ISubCategory>
  ) {}

  async createProduct(
    createProductDto: CreateProductDto): Promise<IProduct> {
    const newProduct = await new this.productModel(createProductDto);
    await this.SubCategoryModel.findByIdAndUpdate(createProductDto.subcategory,{$push:{products:newProduct }})

    return newProduct.save();
  }

  async getAllProducts(): Promise<IProduct[]> {
    const productData = await this.productModel.find().populate("subcategory").select('-__v');
    if (!productData || productData.length == 0) {
      throw new NotFoundException('Product data not found!');
    }
    return productData;
  }

  async getproduct(productID: string): Promise<IProduct> {
    const existingproduct = await this.productModel.findById(
      productID,
    ).exec();
    if (!existingproduct) {
      throw new NotFoundException(`product ${productID} does not exist!`);
    }
    return existingproduct;
  }

  async updateproduct(
    productID: string,

    updateproductDto: UpdateProductDto,
  ): Promise<IProduct> {
    const existingproduct = await this.productModel.findByIdAndUpdate(
      productID,
      updateproductDto,
      { new: true },
    );
    if (!existingproduct) {
      throw new NotFoundException(`product #${productID} not found`);
    }
    return existingproduct;
  }

  async deletesubCategory(productID: string): Promise<IProduct> {
    const deletedproduct = await this.productModel.findByIdAndDelete(productID);
    await this.SubCategoryModel.findByIdAndUpdate(deletedproduct.subcategory,{$pull:{products:deletedproduct._id}})
    if (!deletedproduct) {
      throw new NotFoundException(`product #${productID} not found`);
    }
    return deletedproduct;
  }
}
