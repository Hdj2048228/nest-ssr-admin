import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MaxLength } from 'class-validator'

export class CreateAdminUserDto {
  @ApiProperty({ required: true, description: '用户邮箱' })
  @IsEmail({ message: '[$property]不是邮箱' })
  @MaxLength(200)
  email: string

  @ApiProperty({ description: '密码' })
  @IsString()
  password: any

  @ApiProperty({ description: '用户名' })
  @IsString()
  username: string
}
