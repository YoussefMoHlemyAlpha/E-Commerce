import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { UserModel } from 'src/models/user.model';
import { CategoryModel } from 'src/models/category.model';
import { BrandModel } from 'src/models/brand.model';
import { ProductModel } from 'src/models/product.model';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[UserModel,CategoryModel,BrandModel,ProductModel],
  controllers: [ProductController],
  providers: [ProductService,JwtService],
})
export class ProductModule {}
