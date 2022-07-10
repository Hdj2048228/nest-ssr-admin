export interface BasicPageParams {
  pageNumber: number
  pageSize: number
}

export interface BasicFetchResult<T> {
  data: T[]
  total: number
}
