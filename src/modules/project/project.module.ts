import { Module } from '@nestjs/common'
import { ApiController } from './api.controller'
import { ApiProjectService } from './project.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Project } from './project.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Project])],
  controllers: [ApiController],
  providers: [ApiProjectService],
  exports: [ApiProjectService, TypeOrmModule]
})

export class ProjectModule {}
