export const getOrderStatus = (status: string, language: string) => {
  switch (status) {
    case 'pending':
      return language === 'en' ? 'Pending' : 'Chờ xử lý'
      case 'unpaid':
        return language === 'en' ? 'Payment pending' : 'Chờ thanh toán';      
    case 'confirmed':
      return language === 'en' ? 'Confirmed' : 'Đã xác nhận'
    case 'processing':
      return language === 'en' ? 'Processing' : 'Đang xử lý'
    case 'shipped':
      return language === 'en' ? 'Shipped' : 'Đã gửi hàng'
    case 'delivered':
      return language === 'en' ? 'Delivered' : 'Đã nhận hàng'
    case 'cancelled':
      return language === 'en' ? 'Cancelled' : 'Đã hủy'
    case 'returned':
      return language === 'en' ? 'Returned' : 'Đã hoàn trả'
    case 'refunded':
      return language === 'en' ? 'Refunded' : 'Đã hoàn tiền'
    default:
      return ''
  }
}
