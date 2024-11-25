import { IProduct } from './product'

export interface ICategory {
  _id?: string
  categoryName: string
  description: string
}
export interface ICategoryDataResponse {
  category: ICategory
  products: IProduct[]
}
