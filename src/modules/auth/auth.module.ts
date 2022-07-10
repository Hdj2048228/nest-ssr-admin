import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AdminUser } from '@/modules/AdminUser/AdminUser.entity'
import { AdminUserModule } from '@/modules/AdminUser/AdminUser.module'
import { LocalStrategy } from '@/modules/auth/local.strategy'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from '@/modules/auth/jwt.strategy'
import { jwtConstants } from '@/modules/auth/constants'

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminUser]),
    AdminUserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' }
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})

export class AuthModule {}
