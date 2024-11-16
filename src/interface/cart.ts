export interface ICartItem {
  id?: string
  productId?: string
  quantity: number
  price: number
}

export interface ICart {
  userId?: string
  items?: ICartItem[]
}

export interface AddToCartData {
  productId: string
  quantity: number
}

export interface UpdateCartItemData {
  quantity: number
}
