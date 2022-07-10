import { BasicPageParams, BasicFetchResult } from './basicFetchParamResult'
export interface User {
  id: number
  name: string
}

export interface UserPageListParam extends BasicPageParams{
  name: string
}
export interface UserListItem {
  id: string
  name: string
  createTime: string
  status: number
}

/**
 * @description: Request list return value
 */
export type UserListResultModel = BasicFetchResult<UserListItem>
