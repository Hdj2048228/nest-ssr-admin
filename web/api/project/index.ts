import { defHttp } from '~/web/request'
import { ProjectSearchParams } from '~/typings/common/project'

enum Api {
  projects = '/api/projects',
}

export const getProjects = async (params: ProjectSearchParams) => {
  return await defHttp.get<any>({ url: Api.projects, params })
}
