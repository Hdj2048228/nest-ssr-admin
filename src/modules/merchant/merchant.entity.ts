import { ApiProperty } from '@nestjs/swagger'
import { Exclude, Expose } from 'class-transformer'
import { User } from '../user/user.entity'
import { BaseEntity } from '../base/base.entity'
import {
  Column,
  Entity,
  // OneToOne, // JoinColumn,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class Merchant extends BaseEntity {
  @ApiProperty({ description: '自增 id' })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ description: 'name' })
  @Column({ type: 'varchar', length: 255 })
  name: string

  @ApiProperty({ type: 'tinyint', description: '是否签署发布' })
  @Column({ type: 'tinyint' })
  formal: number

  @ApiProperty({ type: 'datetime', description: '创建时间' })
  @Column({ type: 'datetime' })
  @Exclude()
  create_time: string

  @ApiProperty({ type: 'string', description: '邮箱' })
  @Expose()
  get email (): string {
    return this.user?.email
  }

  @ApiProperty({ type: 'string', description: '创建时间' })
  @Expose()
  get createTime (): string {
    return this.getBJTime(this.create_time)
    // return dayjs(this.create_time).utc().utcOffset(-8).format('YYYY-MM-DD HH:mm:ss')
  }

  @Exclude()
  user: User

  constructor (partial: Partial<Merchant>) {
    super(partial)
    Object.assign(this, partial)
    this.user = partial?.user
  }
}
