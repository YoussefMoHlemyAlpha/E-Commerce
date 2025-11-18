import { Controller, Post,Body,Get, Inject, UseGuards ,Req, Patch} from '@nestjs/common';
import { CartService } from './cart.service';
import  { AuthGards } from 'src/common/guards/auth.guards';
import type{ AuthRequest } from 'src/common/guards/auth.guards';
import { ICart } from 'src/types/cart.type';
@Controller('cart')
export class CartController {

    constructor(private readonly cartService:CartService){}

    @Get('/get-cart')
    @UseGuards(AuthGards)
    async getCart(@Req() req:AuthRequest){
 const userId=req.user._id
 const data=await this.cartService.getCart(userId)
 return data
    }

    @Post('/add-cart')
    @UseGuards(AuthGards)
    async addCart(@Req() req:AuthRequest){
        const userId=req.user._id
        const {quantity,product}=req.body
        return await this.cartService.addCart({userId,quantity,product})
    }

    @Patch('/remove-from-cart')
    @UseGuards(AuthGards)
    async removeFromCart(@Req() req:AuthRequest){
        const userId=req.user._id
        const {product}=req.body
        return await this.cartService.removeFromCart({userId,product})
    } 

}