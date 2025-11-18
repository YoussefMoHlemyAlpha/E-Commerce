import { MongooseModule, Prop, Schema } from "@nestjs/mongoose";
import mongoose, { Types } from "mongoose";
import { User } from "./user.model";
import {SchemaFactory} from "@nestjs/mongoose"
import slugify from "slugify";
import { Brand } from "./brand.model";



@Schema({
    timestamps:true
})

export class Category{
    @Prop({
        type:String,
        unique:true,
        required:true,
        set:function(value:string){
           this.set({slug:slugify(value)})
           return value

        }
    })
    name:string
        @Prop({
        type:String,
        unique:true,
        required:true,

    })
    slug:string
    @Prop({
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:User.name
    })
    createdBy:Types.ObjectId
        @Prop({
        type:String,
        required:true
    })
    image:string

    @Prop({
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Brand'
    })
    brands:Array<Types.ObjectId>

}


const categorySchema=SchemaFactory.createForClass(Category)

categorySchema.pre('save',function(next){

    next()
})



export const CategoryModel=MongooseModule.forFeature([
    {
        name:Category.name,
        schema:categorySchema
    }
])