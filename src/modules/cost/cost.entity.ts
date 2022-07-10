import { ApiProperty } from '@nestjs/swagger'
// import * as bcrypt from 'bcrypt'
import { Exclude, Expose } from 'class-transformer'
import {
  // BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm'

const dayjs = require('moment')
// const utc = require('dayjs/plugin/utc')
// dayjs.extend(utc)

@Entity()
export class CostEntity {
  @ApiProperty({ description: '自增 id' })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ description: 'name' })
  @Column({ type: 'varchar', length: 32 })
  name: string

  @ApiProperty({ type: 'datetime', description: '创建时间' })
  @Exclude()
  create_time: string

  @ApiProperty({ type: 'string', description: '创建时间' })
  @Expose()
  get createTime (): string {
    return dayjs(this.create_time).utc().utcOffset(-8).format('YYYY-MM-DD HH:mm:ss')
  }

  constructor (partial: Partial<CostEntity>) {
    Object.assign(this, partial)
  }

}
