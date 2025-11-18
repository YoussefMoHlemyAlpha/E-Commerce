import { Module } from '@nestjs/common';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { BrandModel } from 'src/models/brand.model';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from 'src/models/user.model';
@Module({
  imports:[BrandModel,UserModel],
  controllers: [BrandController],
  providers: [BrandService,JwtService]
})
export class BrandModule {}
