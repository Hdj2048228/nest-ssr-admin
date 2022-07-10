import { PageOptionsDto } from '@/common/dtos'
import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
export class UserPageQueryDto extends PageOptionsDto {
  @ApiPropertyOptional({
    default: ''
  })
  @IsString({ message: '参数[$property]要求是字符串!' })
  @IsOptional()
  readonly name?: string = ''

}
