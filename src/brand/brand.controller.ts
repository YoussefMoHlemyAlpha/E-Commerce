import { Controller, Post ,Body, UseInterceptors, UploadedFile, UseGuards, Req, Patch, Param, Get} from '@nestjs/common';
import { BrandService } from './brand.service';
import type{ IBrand } from 'src/types/brand.type'
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthGards,  type AuthRequest } from 'src/common/guards/auth.guards';
import { Types } from 'mongoose';
import { multerOptions } from 'src/common/utils/multer';
@Controller('brand')
export class BrandController {

    constructor(private readonly brandService:BrandService){}

    @Post('create')
    @UseGuards(AuthGards)
    @UseInterceptors(FileInterceptor('image',{
     storage:multerOptions('./src/uploads/brands')
    }))
    async createBrand(@ Req() req:AuthRequest,@Body() data:IBrand,@UploadedFile() image:Express.Multer.File){
        console.log(image);
        data.image=image.path
        data.createdBy=req.user._id
        return await this.brandService.create(data)
    }




    @Patch('update/:id')
    @UseGuards(AuthGards)
    @UseInterceptors(FileInterceptor('image',{
     storage:multerOptions('./src/uploads/brands')
    }))
    async updateBrand(@ Req() req:AuthRequest,@Body() data:IBrand,@Param('id') id:Types.ObjectId,@UploadedFile() image:Express.Multer.File){
        console.log(image);
        data.image=image.path
        data.createdBy=req.user._id
        return await this.brandService.updateBrand(id,data)
    }
    
      
    @Get('get{/:id}')
    async find(@Param('id') id:Types.ObjectId){
        if(id){
            return {
                data: await this.brandService.findOne(id)
        }
    }
        return {
            data:  await this.brandService.findAll()
        }
    
}
}