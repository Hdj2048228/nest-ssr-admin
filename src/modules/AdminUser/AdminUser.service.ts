import {
  ClassSerializerInterceptor,
  HttpException, HttpStatus,
  Injectable,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { AdminUser } from './AdminUser.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ApiResponse } from '@nestjs/swagger'
import { CreateAdminUserDto } from './dto/CreateAdminUser.dto'
import { AuthService } from '@/modules/auth/auth.service'

@Injectable()
export class ApiAdminUserService {
  constructor (@InjectRepository(AdminUser) private readonly adminUserRepository: Repository<AdminUser>, private readonly authService: AuthService) {
  }

  @ApiResponse({ type: AdminUser })
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  async register (createAdminUser: CreateAdminUserDto): Promise<any> {
    const user = await this.findByUsername(createAdminUser.username)
    if (user) {
      throw new HttpException('用户名已存在', HttpStatus.OK)
    }
    const { password } = createAdminUser
    createAdminUser.password = await this.authService.encryptText(password)
    return await this.adminUserRepository.save(createAdminUser)
  }

  async findByUsername (username: string) {
    return await this.adminUserRepository.findOne({
      where: { email: username }
    })
  }

  @ApiResponse({ type: AdminUser })
  @UseInterceptors(ClassSerializerInterceptor)
  async login (body: any) {
    const user = await this.authService.findUser(body.username)
    if (!user) {
      throw new HttpException('用户名不存在', HttpStatus.OK)
    }

    if (await this.authService.checkPassword(user.password, body.password)) {
      return await this.authService.login(user)
    } else {
      return new HttpException('用户名或密码错误', HttpStatus.OK)
    }
  }
}
