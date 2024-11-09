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
  status?: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned' | 'refunded'
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
