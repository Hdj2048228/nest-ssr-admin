import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MaxLength } from 'class-validator' // IsAlphanumeric,

export class CreateUserDto {
  @ApiProperty({ description: '用户名' })
  @IsString()
  @MaxLength(14)
  name: string

  @ApiProperty({ description: '密码' })
  @IsString()
  password: string

  @ApiProperty({ required: false, description: '邮箱' })
  @IsEmail({ message: '[$property]不是邮箱' })
  email: string
}
