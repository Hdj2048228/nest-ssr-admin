import { ApiProperty } from '@nestjs/swagger'

import {
  Column,
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class AdminUser {
  @ApiProperty({ description: '自增 id' })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ description: 'admin系统用户邮箱' })
  @Column({ type: 'varchar', length: 64 })
  email: string

  @ApiProperty({ description: '密码' })
  @Column({ type: 'varchar', length: 128 })
  password: string

  @ApiProperty({ description: '创建时间' })
  @Column({ type: 'datetime' })
  @CreateDateColumn()
  created: string

  @ApiProperty({ description: '账号' })
  @Column()
  username: string
}
