import { IProduct } from './product'

export interface IReview {
  id?: string
  productId: IProduct
  userId: string
  rating: number
  reviewText: string
  createdAt?: Date
}
