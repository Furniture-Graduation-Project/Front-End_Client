export interface IProductItem {
  _id: string
  productId: string
  variants: IVariant[]
  stock: number
  price: number
  SKU: string
  image?: string
}

export interface IVariant {
  _id: string
  variant: string
  value: string
}
