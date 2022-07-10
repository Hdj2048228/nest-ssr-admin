import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AdminUser } from './AdminUser.entity'
import { AdminUserController } from './AdminUser.controller'
import { ApiAdminUserService } from './AdminUser.service'
import { AuthService } from '@/modules/auth/auth.service'
import { JwtService } from '@nestjs/jwt'

@Module({
  imports: [TypeOrmModule.forFeature([AdminUser])],
  controllers: [AdminUserController],
  providers: [ApiAdminUserService, AuthService, JwtService],
  exports: [ApiAdminUserService]
})
export class AdminUserModule {}
