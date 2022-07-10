import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
  Body,
  UseGuards
} from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { AdminUser } from './AdminUser.entity'
import { ApiAdminUserService } from './AdminUser.service'
import { CreateAdminUserDto } from './dto/CreateAdminUser.dto'
import { LocalAuthGuard } from '@/modules/auth/LocalAuth.guard'

@ApiTags('project')
@Controller('/api/admin_user')
export class AdminUserController {
  constructor (private readonly apiAdminUserService: ApiAdminUserService) {}

  @Post('/register')
  @ApiResponse({ type: AdminUser })
  @UseInterceptors(ClassSerializerInterceptor)
  async register (@Body() createAdminUser: CreateAdminUserDto) {
    return await this.apiAdminUserService.register(createAdminUser)
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiResponse({ type: AdminUser })
  @UseInterceptors(ClassSerializerInterceptor)
  async login (@Body() body) {
    return await this.apiAdminUserService.login(body)
  }
}
