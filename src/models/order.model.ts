import { Prop, Schema } from "@nestjs/mongoose";
import { IOrder } from "src/types/order.type";
import { Types} from "mongoose";
import { PaymentMethod, OrderStatus } from "src/types/order.type";
import { User } from "./user.model";
import { Product } from "./product.model";
import { SchemaFactory } from "@nestjs/mongoose";
import { MongooseModule } from "@nestjs/mongoose";
@Schema({timestamps:true})

export class Order implements IOrder{
    @Prop({
        type:Types.ObjectId,
        ref:User.name,
        required:true
    })
    user:Types.ObjectId
     @Prop({type:[{
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
     }],})
    items:Array<{product:Types.ObjectId,quantity:number}>
     @Prop({})
    product:Types.ObjectId
     @Prop({})
    quantity:number
     @Prop({
        type:Number,
        required:true,
        default:0
     })
    subtotal:number
     @Prop({
        type:Number,
        default:0
     })
    discount:number
     @Prop({
        type:Number,
        required:true,

     })
    total:number
     @Prop({
        type:String,
        required:true
     })
    address:string
     @Prop([{
        type:String
     }])
    instructions:string[]
     @Prop({
        type:String,
        required:true
     })
    phone:string
     @Prop({
        type:String,
        enum:Object.values(PaymentMethod),
        default:PaymentMethod.CASH
     })
    paymentMethod:PaymentMethod
     @Prop({
        type:String,
        enum:Object.values(OrderStatus),
        default:OrderStatus.PENDING
     })
    orderStatus:OrderStatus
}


export const OrderSchema=SchemaFactory.createForClass(Order)

export const OrderModel=MongooseModule.forFeature([
    {
        name:Order.name,
        schema:OrderSchema
    }
])