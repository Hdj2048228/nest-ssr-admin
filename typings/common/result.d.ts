export interface Result<T = any> {
  code: number
  type: 'success' | 'error' | 'warning'
  message: string
  data: T
}
export interface PureTableResult<T = any> {
  list: [T]
  current?: number
  pageSize?: number
  total?: number
}
export interface PurePageQuery {
  current?: number
  pageSize?: number
}
export interface PurePageOptions {
  params: PurePageQuery
}
export interface PureResult{
  success: boolean // if request is success
  data?: any // response data
  errorCode?: string // code for errorType
  errorMessage?: string // message display to user
  showType?: number // error display type： 0 silent; 1 message.warn; 2 message.error; 4 notification; 9 page
  traceId?: string // Convenient for back-end Troubleshooting: unique request ID
  host?: string // onvenient for backend Troubleshooting: host of current access server
}
export interface PureTableListResult extends PureResult {
  data?: PureTableResult // response data
}
/**
 * @description: Request result set
 */
export enum ResultEnum {
  SUCCESS = 0,
  ERROR = 1,
  TIMEOUT = 401,
  TYPE = 'success',
}

/**
 * @description: request method
 */
export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

/**
 * @description:  contentTyp
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}
