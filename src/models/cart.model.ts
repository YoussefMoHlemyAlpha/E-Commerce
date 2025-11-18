import { Prop, Schema } from "@nestjs/mongoose";
import { ICart } from "../types/cart.type";
import { Types } from "mongoose";
import { User } from "./user.model";
import { Product } from "./product.model";
import { SchemaFactory } from "@nestjs/mongoose";
import { MongooseModule } from "@nestjs/mongoose";
@Schema({
    timestamps:true
})
export class Cart implements ICart {
@Prop({
    type:Types.ObjectId,
    ref:User.name,
    unique:true,
})
user:Types.ObjectId;


@Prop({
type:[{
    product:{
        type:Types.ObjectId,
        ref:Product.name,
        required:true,
    },
    qauntity:{
        type:Number,
        default:1,
        required:true
    }
}],
required:true,
default:[],
})
items:{ product: Types.ObjectId; quantity: number }[]
}


const CartSchema=SchemaFactory.createForClass(Cart)

export const CartModel=MongooseModule.forFeature([
    {
        name:Cart.name,
        schema:CartSchema
    }
])