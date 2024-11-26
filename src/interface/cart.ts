export interface ICartItem {
  id?: string
  productId?: string
  quantity: number
  price: number
}

export interface ICart {
  UserID?: string
  carts?: ICartItem[]
}

export interface AddToCartData {
  productId: string
  quantity: number
}

export interface UpdateCartItemData {
  quantity: number
}
export interface IItemCartData {
  productId: string
  productOptionId: string
  quantity: number
  price: number
}
