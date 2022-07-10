import { ApiProperty } from '@nestjs/swagger'
import { IsArray } from 'class-validator'

export class PageDto<T> {
  @IsArray()
  @ApiProperty({ isArray: true })
  readonly data: T[]

  @ApiProperty({ type: Number })
  readonly total: Number

  constructor (data: T[], total: Number) {
    this.data = data
    this.total = total
  }
}
