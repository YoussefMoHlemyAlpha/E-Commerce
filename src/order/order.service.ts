import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Cart } from 'src/models/cart.model';
import { Order } from 'src/models/order.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PaymentMethod } from 'src/types/order.type';
import { IProduct } from 'src/types/Product.type';
import { Product } from 'src/models/product.model';
@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order.name) private orderModel: Model<Order>,
        @InjectModel(Cart.name) private cartModel: Model<Cart>,
        @InjectModel(Product.name) private ProductModel:Model<Product>
    ) {}

    async createOrder({userId,discount = 0,instructions,address,phone,paymentMethod}:{userId:Types.ObjectId,discount?:number,instructions?:string[],address:string,phone:string,paymentMethod?:PaymentMethod}){
           const cart=await this.cartModel.findOne({user:userId}).populate("item.product")
           if(!cart || cart.items.length==0){
               throw new ConflictException("Cart is empty")
           }
           const totalPrice=0
           const subtotal=cart.items.reduce((totalPrice,item)=>totalPrice+((item.product as unknown as IProduct).salePrice * item.quantity as any),0)
           const total=subtotal-((discount==0 ? 0 : discount/100)*subtotal)
            for(const item in cart.items){
                await this.ProductModel.updateOne({_id:cart.items[item].product},{$inc:{stock:-cart.items[item].quantity}})
            }
           const order=await this.orderModel.create({items:cart.items,user:userId,discount,address,phone,paymentMethod,instructions})
           await this.cartModel.updateOne({
            items:[]
           })
           return {
            data:{
                     order
            }
           }
           
    }

}
