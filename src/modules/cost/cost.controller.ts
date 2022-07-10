import {
  Controller,
  Get,
  Query,
  ValidationPipe,
  UsePipes,
  UseInterceptors,
  ClassSerializerInterceptor, UseGuards
} from '@nestjs/common'
import { CostService } from './cost.service'
import { PageDto } from 'src/common/dtos'
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger' // ApiBody,
import { CostEntity } from './cost.entity'
import { CostPageQueryDto } from './dto/page-cost.dto'
import { JwtAuthGuard } from '@/modules/auth/jwtAuth.guard'

@ApiTags('Cost')
@ApiBearerAuth()
@Controller('/api')
export class CostController {
  constructor (private readonly costService: CostService) {}

  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '获取用户列表' })
  @ApiQuery({ type: CostPageQueryDto })
  @ApiResponse({ type: PageDto })
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/cost/list')
  async List (
    @Query() query: any
  ): Promise<PageDto<CostEntity>> {
    return await this.costService.paginate(query)
  }
}
