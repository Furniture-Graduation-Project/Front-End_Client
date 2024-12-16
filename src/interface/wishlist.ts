export interface IWishlist {
  _id?: string
  productId: {
    _id: string
    name: string
    images: string[]
  }
  addedAt?: Date
  userId?: string
}
