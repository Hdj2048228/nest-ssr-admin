import { defHttp } from '~/web/request'
import { AdminUser } from '~/typings/common/adminUser'

enum Api {
  register = '/api/admin_user/register',
  login = '/api/admin_user/login'
}

export const registerAdminUser = async (params: AdminUser): Promise<any> => {
  return await defHttp.post<any>({ url: Api.register, params })
}

export const loginAdminUser = async (params: AdminUser): Promise<any> => {
  return await defHttp.post<any>({ url: Api.login, params })
}
