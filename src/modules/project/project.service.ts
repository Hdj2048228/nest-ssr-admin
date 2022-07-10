import { ClassSerializerInterceptor, Injectable, UseInterceptors } from '@nestjs/common'
import { Project } from './project.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ApiResponse } from '@nestjs/swagger'

@Injectable()
export class ApiProjectService {
  constructor (@InjectRepository(Project) private readonly projectRepository: Repository<Project>) {}

  @ApiResponse({ type: Project })
  @UseInterceptors(ClassSerializerInterceptor)
  async projects (params): Promise<any> {
    const data = await this.projectRepository.find()
    return data.filter(item => item.enName.includes(params.name))
  }
}
