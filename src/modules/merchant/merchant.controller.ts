import {
  Controller,
  Get,
  Param,
  Query,
  ParseIntPipe,
  ValidationPipe,
  UsePipes,
  UseInterceptors,
  ClassSerializerInterceptor, UseGuards
} from '@nestjs/common'
import { MerchantService } from './merchant.service'
import { MerchantPageQueryDto } from './dto/page-merchant.dto'
import { PageDto } from 'src/common/dtos'
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger' // ApiBody,
import { Merchant } from './merchant.entity'
import { JwtAuthGuard } from '@/modules/auth/jwtAuth.guard'

@ApiTags('Merchant')
@ApiBearerAuth()
@Controller('/api')
export class MerchantController {
  constructor (private readonly merchantService: MerchantService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/merchant')
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll () {
    return await this.merchantService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ type: Merchant })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/merchant/detail/:id')
  async findOne (@Param('id', ParseIntPipe) id: string) {
    return await this.merchantService.findOne(+id)
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '获取商户列表' })
  @ApiQuery({ type: MerchantPageQueryDto })
  @ApiResponse({ type: PageDto })
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/merchant/list')
  async List (
    @Query() query: MerchantPageQueryDto
  ): Promise<PageDto<Merchant>> {
    return await this.merchantService.paginate(query)
  }

}
