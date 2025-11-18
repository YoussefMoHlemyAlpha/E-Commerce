import {  Injectable, NotFoundException } from '@nestjs/common';
import { IProduct } from 'src/types/Product.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/models/product.model';
import { Brand } from 'src/models/brand.model';
import { Category } from 'src/models/category.model';


@Injectable()
export class ProductService {
  constructor(
@InjectModel(Product.name) private ProductModel: Model<Product>,
@InjectModel(Brand.name) private BrandModel:Model<Brand>,
@InjectModel(Category.name) private CategoryModel:Model<Category> 
) {}

  async create(data: IProduct) {
    const brand=await this.BrandModel.findOne({_id:data.brand})
    if(!brand){
        throw new NotFoundException("Brand not found")
    }
    const category=await this.CategoryModel.findOne({_id:data.category})
    if(!category){
        throw new NotFoundException("Category not found")
    }
    data.salePrice=data.originalPrice-(data.discount/100)*data.originalPrice
    const product=await this.ProductModel.create(data)
    return {
      data:product
    }
    
  }



}
