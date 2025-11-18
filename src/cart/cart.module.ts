import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { CartModel } from 'src/models/cart.model';
import { ProductModel } from 'src/models/product.model';
import { UserModel } from 'src/models/user.model';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[CartModel,ProductModel,UserModel],
  controllers: [CartController],
  providers: [CartService,JwtService]
})
export class CartModule {}
