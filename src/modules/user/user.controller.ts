import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  ParseIntPipe,
  ValidationPipe,
  UsePipes,
  UseInterceptors,
  ClassSerializerInterceptor, UseGuards
} from '@nestjs/common'
import { UserService } from './user.service'
import { UpdateUserDto } from './dto/update-user.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { UserPageQueryDto } from './dto/page-user.dto'
import { PageDto } from 'src/common/dtos'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger' // ApiBody,
import { User } from './user.entity'
import { JwtAuthGuard } from '@/modules/auth/jwtAuth.guard'

@ApiTags('User')
@ApiBearerAuth()
@Controller('/api')
export class UserController {
  constructor (private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/users')
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll () {
    return await this.userService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: User })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/user/detail/:id')
  async findOne (@Param('id', ParseIntPipe) id: string) {
    return await this.userService.findOne(+id)
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '注册用户' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ type: User })
  @Post('/register')
  async getRegister (@Body() createUser: CreateUserDto) {
    return await this.userService.register(createUser)
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '获取用户列表' })
  @ApiQuery({ type: UserPageQueryDto })
  @ApiResponse({ type: PageDto })
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/user/list')
  async List (
    @Query() query: UserPageQueryDto
  ): Promise<PageDto<User>> {
    return await this.userService.paginate(query)
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '更新用户别用！！。会真的更新' })
  @Patch('/user/:id')
  async update (@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const data = await this.userService.update((+id), updateUserDto)
    return data
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '别用！！会真的删除' })
  @Delete('/user/:id')
  async remove (@Param('id') id: string) {
    return await this.userService.remove((+id))
  }
}
