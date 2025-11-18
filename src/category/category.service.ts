import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ICategory } from 'src/types/category.type';
import { Category, CategoryModel } from 'src/models/category.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand } from 'src/models/brand.model';
import { IBrand } from 'src/types/brand.type';
import { Types } from 'mongoose';
import fs from 'fs/promises';
@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private CategoryModel: Model<ICategory>,
    @InjectModel(Brand.name) private BrandModel: Model<any>
  ) {}

  async create(data: ICategory) {
    const isExist = await this.CategoryModel.findOne({ name: data.name });
    if (isExist) {
      throw new ConflictException("Category already exist");
    }

    if (data.brands && data.brands.length) {
      const foundBrands = await this.BrandModel.find({
        _id: { $in: data.brands },
      });

      if (foundBrands.length !== data.brands.length) {
        throw new NotFoundException("Brand not found");
      }
    }

    const category = await this.CategoryModel.create(data);
    return category;
  }


  async updateCategory(categoryId: Types.ObjectId, data: ICategory) {
    const category = await this.CategoryModel.findById({ _id: categoryId });
    if (!category ) {
      throw new NotFoundException("Category already exist");
    }

    if (data.brands && data.brands.length) {
      const foundBrands = await this.BrandModel.find({
        _id: { $in: data.brands },
      });

      if (foundBrands.length !== data.brands.length) {
        throw new NotFoundException("Brand not found");
      }
    }

    if(data.brands?.length){
        category.name=data.name
    }
    if(data.name){
        category.name=data.name
    }
    if(data.image){
        if(category.image){
                        await fs.unlink(category.image)
        }
        category.image=data.image
    }

   await category.save()
    
    return category;
  }


  async findAll() {
    const categories = await this.CategoryModel.find().populate([{
        path:'brands',
        select:'name'
    }]);
    return categories;
  }


}
