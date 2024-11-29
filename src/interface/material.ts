import { IProduct } from './product'

export interface IMaterial {
  _id?: string
  materialName: string
  description: string
}

export interface IMaterialDataResponse {
  metarial: IMaterial
  products: IProduct[]
}
