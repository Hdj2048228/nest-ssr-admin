import { Module } from '@nestjs/common'
import { CostController } from './cost.controller'
import { CostService } from './cost.service'
// import { TypeOrmModule } from '@nestjs/typeorm'
// import { CostEntity } from './cost.entity'

@Module({
  imports: [], // TypeOrmModule.forFeature([CostEntity])
  controllers: [CostController],
  providers: [CostService],
  exports: [CostService] // , TypeOrmModule
})
export class CostModule {}
