import { ApiProperty } from '@nestjs/swagger'
import { IsString, MaxLength } from 'class-validator' // IsAlphanumeric,

export class MerchantInfoDto {
  @ApiProperty({ description: '用户名' })
  @IsString()
  @MaxLength(14)
  name: string

  @ApiProperty({ description: 'id' })
  @IsString()
  @MaxLength(14)
  id: number
}
