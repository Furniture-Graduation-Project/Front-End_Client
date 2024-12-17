import { IProduct } from './product'

export interface IProductItem {
  _id: string
  productId: IProduct
  variants: IVariant[]
  stock: number
  outStock: number
  price: number
  SKU: string
  image?: string
}

export interface IVariant {
  _id: string
  variant: string
  value: string
}
