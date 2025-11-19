import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cart } from 'src/models/cart.model';
import { Model, Types } from 'mongoose';
import { Product } from 'src/models/product.model';
@Injectable()
export class CartService {


    constructor(
        @InjectModel(Cart.name) private CartModel:Model<Cart>,
        @InjectModel(Product.name) private ProductModel:Model<Product>
){}


async getCart(userId:Types.ObjectId){
   let cart=await this.CartModel.findOne({user:userId}).populate({
    path:'items.product'
   })
    if(!cart){
        cart=await this.CartModel.create({items:[],user:userId})
    }
    return {data:cart}

}

async addCart({userId,product,quantity}:{userId:Types.ObjectId , quantity:number , product:Types.ObjectId}){
   const IsExistProduct=await this.ProductModel.findOne({_id:product,stock:{$gte:quantity}})
    if(!IsExistProduct){
        throw new NotFoundException("Product not found")
    }

    let cart =await this.CartModel.findOne({user:userId})
    if(!cart){
    cart=await this.CartModel.create({items:[{product,quantity}],user:userId})
    return {data:cart}
    }

    const index=cart.items.findIndex(item=>{
        return item.product.toString()===product.toString()
    })
    if(index==-1){
        cart.items.push({product,quantity})
        await cart.save()
        return {data:cart}
    }

    const totalQuantity=cart.items[index].quantity+=quantity
    if(!(IsExistProduct?.stock as number>=totalQuantity)){
      cart.items[index].quantity=IsExistProduct?.stock as number
      await cart.save()
      throw new NotFoundException(`available quantity is ${IsExistProduct?.stock}`)
    }

    cart.items[index].quantity=totalQuantity
    await cart.save()
    return {data:cart}

}





async removeFromCart({product,userId}:{product:Types.ObjectId,userId:Types.ObjectId}){


  const cart =await this.CartModel.findOne({user:userId})
    if(!cart || cart.items.length==0){
        throw new ConflictException("Cart is empty")
    }
    const index=cart.items.findIndex(item=>{
        return item.product.toString()===product.toString()
    })
    if(index==-1){
        return new NotFoundException("Product not found in cart")
    }
    cart.items.splice(index,1)
    await cart.save()
    return {data:cart}
}

}
