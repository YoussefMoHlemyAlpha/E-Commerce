import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryModel } from 'src/models/category.model';
import { BrandModel } from 'src/models/brand.model';
import { UserModel } from 'src/models/user.model';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [CategoryModel,BrandModel,UserModel],
  controllers: [CategoryController],
  providers: [CategoryService,JwtService]
})
export class CategoryModule {}
