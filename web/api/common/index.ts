import { defHttp } from '~/web/request'
import { PurePageOptions } from '~/typings/common'
// BasicPageParams, BasicFetchResult, PurePageQuery,

/**
 * @description: Get user menu based on id
 */

export const getTableListApi = async (apiUrl: string, options: PurePageOptions = {
  params: {
    current: 1,
    pageSize: 10
  }
}) => { // : PurePageQuery = { params: { current: 1, pageSize: 20 }
  const { current = 1, pageSize = 10 } = options.params
  const queryParams = {
    ...options.params,
    pageNumber: current,
    pageSize,
  }
  const data = await defHttp.get({ url: apiUrl, params: queryParams }) // <BasicFetchResult>
  if (data) {
    const d = data
    return {
      data: d.data || [],
      page: current,
      total: d.total,
      success: true,
    }
  } else {
    return {
      errorMessage: data,
      success: false,
    }
  }
}
