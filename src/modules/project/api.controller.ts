import { ClassSerializerInterceptor, Controller, Get, Query, UseInterceptors } from '@nestjs/common'
import { ApiProjectService } from './project.service'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { Project } from '@/modules/project/project.entity'

@ApiTags('project')
@Controller('/api')
export class ApiController {
  constructor (private readonly apiProjectService: ApiProjectService) {}

  @Get('/projects')
  @ApiResponse({ type: Project })
  @UseInterceptors(ClassSerializerInterceptor)
  async getProjects (@Query() params) {
    return await this.apiProjectService.projects(params)
  }
}
