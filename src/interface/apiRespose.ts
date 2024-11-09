export interface IApiResponse<T> {
  data: T
  message: string
  totalData?: number
  totalPage?: number
}
