import { UploadedFile,Controller, Post,Body, UseInterceptors, Req, UseGuards ,Patch, Param, Get} from '@nestjs/common';
import { CategoryService } from './category.service';
import type{ ICategory } from 'src/types/category.type';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/utils/multer';
import type{ AuthRequest } from 'src/common/guards/auth.guards';
import  { AuthGards } from 'src/common/guards/auth.guards';
import { Types } from 'mongoose';
@Controller('category')
export class CategoryController {

    constructor(private readonly categoryService:CategoryService){} 


    @Post('/create')
    @UseGuards(AuthGards) 
    @UseInterceptors(FileInterceptor('image',{
        storage:multerOptions('./src/uploads/categories')
            }))
    async create(@Req() req:AuthRequest,@Body() data:ICategory,@UploadedFile() image:Express.Multer.File){
        data.image=image.path
        data.createdBy=req.user._id
        return {
            data:await this.categoryService.create(data)
    }
    }



    @Patch('/update/:id')
    @UseGuards(AuthGards) 
    @UseInterceptors(FileInterceptor('image',{
        storage:multerOptions('./src/uploads/categories')
            }))
    async updateCategory(@Req() req:AuthRequest,@Body() data:ICategory,@UploadedFile() image:Express.Multer.File,@Param('id') id:Types.ObjectId){
        if(image){
            data.image=image.path
        }
        
        data.createdBy=req.user._id
        return {
            data:await this.categoryService.updateCategory(id,data)
    }
    }
    @Get('/all')
    async findAll(){
        return{data: await this.categoryService.findAll()}
    }

}
