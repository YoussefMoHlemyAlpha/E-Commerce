import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFiles, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import type { IProduct } from 'src/types/Product.type';
import { AuthGards } from 'src/common/guards/auth.guards';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/utils/multer';
import type{ AuthRequest } from 'src/common/guards/auth.guards';
@Controller('/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/create')
  @UseGuards(AuthGards)
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: multerOptions('./src/uploads/products'),
    }),
  )
  create(@Req() req:AuthRequest,@Body() data: IProduct,@UploadedFiles() images: Express.Multer.File[]) {
    data.images=images.map(image=>image.path)
    data.createdBy=req.user._id
    console.log(data);
    return this.productService.create(data);
  }




}
