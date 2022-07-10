import { ApiProperty } from '@nestjs/swagger'
import * as bcrypt from 'bcrypt'
import { Exclude, Expose } from 'class-transformer'
import { ZeroOneTrueFalseEnum } from '../../common/enums'
import {
  BeforeInsert,
  Column,
  Entity, // OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
// import { Merchant } from '../merchant/merchant.entity'

const dayjs = require('moment')
// const utc = require('dayjs/plugin/utc')
// dayjs.extend(utc)

@Entity()
export class User {
  @ApiProperty({ description: '自增 id' })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ description: 'name' })
  @Column({ type: 'varchar', length: 32 })
  name: string

  @ApiProperty({ description: '密码' })
  @Exclude()
  @Column({ type: 'varchar', length: 128, select: false })
  password: string

  @ApiProperty({ description: '邮箱' })
  @Column({ type: 'varchar', length: 64 })
  email: string

  @ApiProperty({ description: '手机号' })
  @Column({ type: 'char', length: 11, default: '' })
  phone: string

  @ApiProperty({ description: '商户id' })
  @Column({ type: 'bigint', default: '' })
  merchant_id: number

  @ApiProperty({ enum: ZeroOneTrueFalseEnum, description: '是否完成注册公司信息 0 未完成， 1已完成' })
  @Column({ type: 'tinyint' })
  finish_init: ZeroOneTrueFalseEnum

  @ApiProperty({ type: 'datetime', description: '创建时间' })
  @Exclude()
  create_time: string

  @ApiProperty({ type: 'string', description: '创建时间' })
  @Expose()
  get createTime (): string {
    return dayjs(this.create_time).utc().utcOffset(-8).format('YYYY-MM-DD HH:mm:ss')
  }

  // @OneToOne(type => Merchant, m => m)
  // merchant: Merchant

  constructor (partial: Partial<User>) {
    Object.assign(this, partial)
  }

  @BeforeInsert()
  async encryptPwd () {
    if (!this.password) return
    this.password = await bcrypt.hashSync(this.password, 10)
  }
}
