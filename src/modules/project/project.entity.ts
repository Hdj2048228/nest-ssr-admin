import { ApiProperty } from '@nestjs/swagger'
import {
  Column,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Expose } from 'class-transformer'

@Entity()
export class Project {
  constructor (partial: Partial<Project>) {
    Object.assign(this, partial)
  }

  @ApiProperty({ description: '自增 id' })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ description: '多语言名称' })
  @Column({ type: 'json' })
  names: any

  @ApiProperty({ description: '商户ID' })
  merchant_id: number

  @ApiProperty({ type: 'string', description: '默认英语名称' })
  @Expose()
  get enName (): string {
    return this.names['en']
  }
}
