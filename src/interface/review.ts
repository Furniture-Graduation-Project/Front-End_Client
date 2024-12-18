import { IProduct } from './product'
import { IUser } from './user'

export interface IReview {
  _id?: string
  productId?: IProduct
  userId: IUser
  rating: number
  reviewText: string
  createdAt?: Date
}
export interface ICreateReview {
  userId?: string
  productId?: string
  rating: number
  reviewText: string
}
