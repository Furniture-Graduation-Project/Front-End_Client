import { ICategory } from './category'
import { IMaterial } from './material'

export interface IProduct {
  _id?: string
  name: string
  category?: ICategory
  description?: string
  price: number
  SKU: string
  images: string[]
  material?: IMaterial
  status: 'available' | 'out of stock' | 'discontinued'
  createdAt: string
}
