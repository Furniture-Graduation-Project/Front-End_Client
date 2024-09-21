export interface IAddress {
  _id: string
  street: string
  city: string
  state: string
  postalCode?: string
  country?: string
  recipientName: string
  phoneNumber: string
  userId?: string
}
