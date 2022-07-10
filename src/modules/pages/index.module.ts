import { Module } from '@nestjs/common'
import AppPageController from './index.controller'
import { AuthService } from '@/modules/auth/auth.service'
import { JwtService } from '@nestjs/jwt'
import { AdminUserModule } from '@/modules/AdminUser/AdminUser.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AdminUser } from '@/modules/AdminUser/AdminUser.entity'

@Module({
  imports: [AdminUserModule, TypeOrmModule.forFeature([AdminUser])],
  controllers: [AppPageController],
  providers: [AuthService, JwtService],
  exports: []
})

export class PagesModule {}
