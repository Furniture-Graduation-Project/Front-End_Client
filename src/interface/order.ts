import { LucideProps } from 'lucide-react'
import { ForwardRefExoticComponent, RefAttributes } from 'react'

export interface IOrder {
  _id?: string
  userId: string
  orderName: string
  orderPhone: string
  orderAddress: string
  totalPrice?: number
  items?: IOrderItem[]
  payment?: IPayment
  shipments?: IShipment
  status?:
    | 'pending'
    | 'confirmed'
    | 'processing'
    | 'shipped'
    | 'delivered'
    | 'received'
    | 'cancelled'
    | 'returned'
    | 'refunded'
    | 'unpaid'

  statusHistory?: {
    status:
      | 'unpaid'
      | 'pending'
      | 'confirmed'
      | 'processing'
      | 'shipped'
      | 'delivered'
      | 'received'
      | 'cancelled'
      | 'returned'
      | 'refunded'
    date?: Date
  }[]
  returnInfo?: {
    reason: string
    items: IItemReturnOrder[]
    dateRequested: Date
    dateResolved: Date
  }
  updatedAt?: Date
  createdAt?: Date
}
export interface IItemReturnOrder {
  productId: string
  productOptionId: string
  quantity: number
  unitPrice: number
  status: string
}
export interface IPayment {
  paymentMethod: 'credit_card' | 'cash_on_delivery'
  amount?: number
  paymentDate?: Date
  paymentStatus?: 'paid' | 'unpaid'
}
export interface IShipment {
  deliveryPerson: string
  item: {
    title: string
    description: string
    shipmentDate?: Date
  }[]
}
export interface IOrderItem {
  productId: string
  productOptionId: string
  unitPrice: number
  quantity: number
}
export interface IQRCodeData {
  qrCode: string
  qrDataURL: string
}

export interface IListStatusOrder {
  id: string
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
}
