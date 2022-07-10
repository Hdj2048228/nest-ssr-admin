import { Module } from '@nestjs/common'
import { MerchantController } from './merchant.controller'
import { MerchantService } from './merchant.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Merchant } from './merchant.entity'
import { User } from '../user/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Merchant, User])],
  controllers: [MerchantController],
  providers: [MerchantService],
  exports: [MerchantService, TypeOrmModule]
})
export class MerchantModule {}
