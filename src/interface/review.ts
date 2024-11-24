export interface IReview {
  id?: string
  productId: any
  userId: string
  rating: number
  reviewText: string
  createdAt?: Date
}
