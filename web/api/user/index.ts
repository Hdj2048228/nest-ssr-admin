import { defHttp } from '~/web/request'
import { UserPageListParam, UserListResultModel } from '~/typings/common/user'

enum Api {
  userList = '/api/user/list',
  merchantList = '/api/merchant/list'
}

/**
 * @description: Get user menu based on id
 */

export const getMerchtUserListApi = async (params: UserPageListParam) => {
  return await defHttp.get<UserListResultModel>({ url: Api.userList, params })
}

/**
 * @description: Get user menu based on id
 */

export const getMerchantListApi = async (params: UserPageListParam) => {
  return await defHttp.get<UserListResultModel>({ url: Api.merchantList, params })
}
